import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../../gql-functions";
import { GET_CHARACTERS_OUTPUT } from "../../types/types";
import CharacterCard from "../../components/cards/character-card";
import Skeleton from "@mui/material/Skeleton";
import { useMediaQuery, useTheme } from "@mui/material";

const CharacterRow = () => {
  const { data, loading, error } = useQuery<{
    characters: GET_CHARACTERS_OUTPUT;
  }>(GET_CHARACTERS(Math.floor(Math.random() * 3)));
  const theme = useTheme();
  const isMordThanMdScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: 16,
        overflowX: "auto",
        justifyContent: "space-between",
        background: "RGBA(256,256,256,0.1)",
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 4,
        paddingLeft: isMordThanMdScreen ? 48 : 0,
        paddingRight: isMordThanMdScreen ? 48 : 0,
      }}
    >
      {loading ? (
        <>
          <div>
            <div style={{ height: 16 }} />
            <Skeleton variant="rectangular" width={200} height={240} />
            <div style={{ height: 16 }} />
            <Skeleton variant="rectangular" width={200} />
            <div style={{ height: 16 }} />
            <Skeleton variant="rectangular" width={100} />
          </div>
          <div>
            <div style={{ height: 16 }} />
            <Skeleton variant="rectangular" width={200} height={240} />
            <div style={{ height: 16 }} />
            <Skeleton variant="rectangular" width={200} />
            <div style={{ height: 16 }} />
            <Skeleton variant="rectangular" width={100} />
          </div>
          <div>
            <div style={{ height: 16 }} />
            <Skeleton variant="rectangular" width={200} height={240} />
            <div style={{ height: 16 }} />
            <Skeleton variant="rectangular" width={200} />
            <div style={{ height: 16 }} />
            <Skeleton variant="rectangular" width={100} />
          </div>
          <div>
            <div style={{ height: 16 }} />
            <Skeleton variant="rectangular" width={200} height={240} />
            <div style={{ height: 16 }} />
            <Skeleton variant="rectangular" width={200} />
            <div style={{ height: 16 }} />
            <Skeleton variant="rectangular" width={100} />
          </div>
        </>
      ) : (
        <>
          {data?.characters.results
            .slice(
              Math.floor(Math.random() * (data?.characters.results.length - 5))
            )
            .slice(0, 4)
            .map((c) => {
              return (
                <div key={c.id} style={{ marginRight: 8, marginLeft: 8 }}>
                  <CharacterCard character={c} />
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default CharacterRow;
