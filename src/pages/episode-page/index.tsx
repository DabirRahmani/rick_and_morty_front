import { useQuery } from "@apollo/client";
import { EpisodeMini, GET_EPISODES_OUTPUT } from "../../types/types";
import { GET_EPISODES } from "../../gql-functions";
import { useEffect, useState } from "react";
import { Box, Card, Divider, Skeleton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import RoutesList from "../../routes";

interface EpisodesBySeason {
  season: string;
  episodes: EpisodeMini[];
}

const EpisodePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadFlag, setLoadFlag] = useState(false);

  const [episodes, setEpisodes] = useState<EpisodeMini[]>([]);

  const [organizedEpisodes, setOrganizedEpisodes] = useState<
    EpisodesBySeason[]
  >([]);

  const { data, loading } = useQuery<{
    episodes: GET_EPISODES_OUTPUT;
  }>(GET_EPISODES, {
    variables: {
      page: currentPage,
    },
    onCompleted(data) {
      setEpisodes([...episodes, ...data.episodes.results]);
      if (data.episodes.info.next !== null) {
        setCurrentPage(currentPage + 1);
      } else {
        setLoadFlag(true);
      }
    },
  });

  useEffect(() => {
    if (loadFlag) {
      let organizedEpisodes: any = {};
      for (let i = 0; i < episodes.length; i++) {
        let seasonName = episodes[i].episode.split("E")[0];
        if (organizedEpisodes[seasonName] === undefined) {
          organizedEpisodes[seasonName] = {
            season: seasonName,
            episodes: [
              {
                ...episodes[i],
              },
            ],
          };
        } else {
          organizedEpisodes[seasonName].episodes.push({
            ...episodes[i],
          });
        }
      }

      setOrganizedEpisodes(Object.values(organizedEpisodes));
    }
  }, [loadFlag]);

  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <div
      style={{
        marginTop: 24,
        marginBottom: 24,
        width: "100%",
        borderRadius: 4,
        background: "RGBA(256,256,256,0.1)",
        paddingTop: 8,
        paddingBottom: 8,
      }}
    >
      {organizedEpisodes.length === 0 ? (
        <div>
          <Skeleton style={{ height: 80, margin: 16 }} />
          <Skeleton style={{ height: 80, margin: 16 }} />
          <Skeleton style={{ height: 80, margin: 16 }} />
          <Skeleton style={{ height: 80, margin: 16 }} />
          <Skeleton style={{ height: 80, margin: 16 }} />
          <Skeleton style={{ height: 80, margin: 16 }} />
        </div>
      ) : (
        <></>
      )}
      {organizedEpisodes.map((s) => {
        return (
          <div>
            <Divider
              light
              style={{ marginLeft: 8, marginRight: 8 }}
              textAlign="left"
            >
              <Typography
                textAlign="center"
                fontWeight="bold"
                variant="h6"
                color={theme.palette.secondary.light}
              >
                {"Season " + parseInt(s.season.split("S")[1])}
              </Typography>
            </Divider>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                margin: 16,
                marginTop: 8,
              }}
              key={s.season}
            >
              {s.episodes.map((e) => {
                return (
                  <Card
                    style={{
                      marginRight: 8,
                      marginBottom: 8,
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                    key={e.id}
                  >
                    <Typography
                      textAlign="center"
                      fontWeight="bold"
                      variant="h6"
                      style={{ marginRight: 8, marginLeft: 8 }}
                      className="links"
                      onClick={() => {
                        navigate(e.id);
                      }}
                    >
                      {parseInt(e.episode.split("E")[1]) + "- "}
                      {e.name}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        margin: 8,
                      }}
                    >
                      <Typography
                        textAlign="center"
                        fontWeight="bold"
                        variant="caption"
                        style={{ marginRight: 8 }}
                      >
                        {e.air_date.split(",")[1]}
                      </Typography>
                      <Typography
                        textAlign="center"
                        fontWeight="bold"
                        variant="caption"
                        style={{ marginRight: 8, whiteSpace: "nowrap" }}
                      >
                        {e.air_date.split(",")[0]}
                      </Typography>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EpisodePage;
