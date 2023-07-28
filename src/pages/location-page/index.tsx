import { useQuery } from "@apollo/client";
import {
  GET_LOCATIONS_OUTPUT,
  LocationFilters,
  LocationMini,
} from "../../types/types";
import { GET_LOCATIONS } from "../../gql-functions";
import { useEffect, useRef, useState } from "react";
import useOnScreen from "../../utils/hooks";
import {
  Box,
  Button,
  Grid,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import LocationCard from "../../components/cards/location-card";
import Icon from "@mdi/react";
import { mdiMenuDown, mdiMenuUp } from "@mdi/js";
import LocationFiltering from "./filter";

const LocationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [locations, setLocations] = useState<LocationMini[]>([]);
  const [filterDropMenuStatus, setFilterDropMenuStatus] = useState(false);
  const [filters, setFilters] = useState<LocationFilters>({
    name: null,
    dimension: null,
    type: null,
  });
  const [filtersForSearch, setFiltersForSearch] = useState<LocationFilters>({
    name: null,
    dimension: null,
    type: null,
  });
  const { data, loading } = useQuery<{
    locations: GET_LOCATIONS_OUTPUT;
  }>(GET_LOCATIONS, {
    variables: {
      page: currentPage,
      ...filtersForSearch,
    },
    onCompleted(data) {
      setLocations([...locations, ...data.locations.results]);

      if (currentPage === 1) setCurrentPage(currentPage + 1);
    },
  });

  const bottomRef = useRef();
  const reachedBottom = useOnScreen(bottomRef);

  useEffect(() => {
    if (!loading && reachedBottom) {
      if (data?.locations.info.next !== null) setCurrentPage(currentPage + 1);
    }
  }, [reachedBottom]);

  const theme = useTheme();

  useEffect(() => {
    if (
      filters.dimension !== filtersForSearch.dimension ||
      filters.name !== filtersForSearch.name ||
      filters.type !== filtersForSearch.type
    ) {
      setLocations([]);
      setCurrentPage(1);
      setFiltersForSearch(filters);
    }
  }, [filters]);

  return (
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
          Locations
        </Typography>
        <Button
          style={{ position: "absolute", top: 8, right: 0 }}
          variant="text"
          onClick={() => {
            if (filterDropMenuStatus)
              setFilters({
                name: null,
                dimension: null,
                type: null,
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
        <LocationFiltering setFilters={setFilters} />
      ) : (
        <></>
      )}
      <Grid container>
        {locations.map((l) => (
          <LocationCard key={l.id} location={l} />
        ))}
        <div ref={bottomRef as any} />

        {loading ? (
          <>
            <Grid item xs={6} md={3}>
              <Skeleton
                style={{
                  height: 200,
                  margin: 16,
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Skeleton
                style={{
                  height: 200,
                  margin: 16,
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Skeleton
                style={{
                  height: 200,
                  margin: 16,
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Skeleton
                style={{
                  height: 200,
                  margin: 16,
                }}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Box>
  );
};

export default LocationPage;
