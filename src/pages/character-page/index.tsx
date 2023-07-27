import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useQuery } from "@apollo/client";
import {
  CharacterFiltes,
  CharacterMini,
  GET_CHARACTERS_OUTPUT,
} from "../../types/types";
import { GET_CHARACTERS } from "../../gql-functions";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MainCharacterCard from "../../components/cards/character-card-main";
import { useRef } from "react";
import useOnScreen from "../../utils/hooks";
import { Button, Skeleton } from "@mui/material";
import Icon from "@mdi/react";
import { mdiMenuDown } from "@mdi/js";
import { mdiMenuUp } from "@mdi/js";
import CharacterFiltering from "./filter";

const CharacterPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [characters, setCharacters] = useState<CharacterMini[]>([]);
  const [filterDropMenuStatus, setFilterDropMenuStatus] = useState(false);
  const [filters, setFilters] = useState<CharacterFiltes>({
    status: null,
    gender: null,
    name: null,
    species: null,
  });
  const [filtersForSearch, setFiltersForSearch] = useState<CharacterFiltes>({
    status: null,
    gender: null,
    name: null,
    species: null,
  });

  const { data, loading } = useQuery<{
    characters: GET_CHARACTERS_OUTPUT;
  }>(GET_CHARACTERS, {
    variables: {
      page: currentPage,
      ...filtersForSearch,
    },
    onCompleted(data) {
      setCharacters([...characters, ...data.characters.results]);
    },
  });

  const bottomRef = useRef();
  const reachedBottom = useOnScreen(bottomRef);

  useEffect(() => {
    if (!loading && reachedBottom) {
      if (data?.characters.info.next !== null) setCurrentPage(currentPage + 1);
    }
  }, [reachedBottom]);

  useEffect(() => {
    if (
      filters.gender !== filtersForSearch.gender ||
      filters.name !== filtersForSearch.name ||
      filters.species !== filtersForSearch.species ||
      filters.status !== filtersForSearch.status 
    ) {
      setCharacters([]);
      setCurrentPage(1);
      setFiltersForSearch(filters);
    }
  }, [filters]);

  const theme = useTheme();
  return (
    <>
      <Box
        style={{
          marginTop: 24,
          marginBottom: 24,
          width: "100%",
          borderRadius: 4,
        }}
        sx={{ background: "RGBA(256,256,256,0.1)" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            position: "relative",
            justifyContent: "center",
          }}
        >
          <Typography
            textAlign="center"
            fontWeight="bold"
            variant="h5"
            color={theme.palette.secondary.light}
            style={{ padding: 8 }}
          >
            Characters
          </Typography>
          <Button
            style={{ position: "absolute", top: 8, right: 0 }}
            variant="text"
            onClick={() => {
              if (filterDropMenuStatus)
                setFilters({
                  gender: null,
                  name: null,
                  species: null,
                  status: null,
                });
              setFilterDropMenuStatus(!filterDropMenuStatus);
            }}
          >
            Filter
            {filterDropMenuStatus ? (
              <Icon path={mdiMenuUp} size={1} />
            ) : (
              <Icon path={mdiMenuDown} size={1} />
            )}
          </Button>
        </div>

        {filterDropMenuStatus ? (
          <CharacterFiltering setFilters={setFilters}/>
        ) : (
          <></>
        )}

        <Grid style={{ paddingBottom: 48 }} container>
          {characters.map((c) => {
            return (
              <Grid item xs={12} md={6} key={c.id}>
                <MainCharacterCard character={c} key={c.id} />
              </Grid>
            );
          })}
          {loading ? (
            <>
              <Grid item style={{ margin: 16 }} xs={12} md={6}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Grid>
              <Grid item style={{ margin: 16 }} xs={12} md={6}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Grid>
              <Grid item style={{ margin: 16 }} xs={12} md={6}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Grid>
              <Grid item style={{ margin: 16 }} xs={12} md={6}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
        <div ref={bottomRef as any} />
      </Box>
    </>
  );
};

export default CharacterPage;
