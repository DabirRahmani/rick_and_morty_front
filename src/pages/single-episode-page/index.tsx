import { useQuery } from "@apollo/client";
import {
  Box,
  Card,
  Divider,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_EPISODE_OUTPUT } from "../../types/types";
import { GET_EPISODE } from "../../gql-functions";
import RoutesList from "../../routes";

const SingleEpisodePage = () => {
  const [episode, setEpisode] = useState<GET_EPISODE_OUTPUT>();
  const { episodeId } = useParams();
  const { loading } = useQuery<{
    episode: GET_EPISODE_OUTPUT;
  }>(GET_EPISODE, {
    variables: {
      id: episodeId,
    },
    onCompleted(data) {
      setEpisode(data.episode);
    },
  });

  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Box
        style={{
          marginTop: 24,
          marginBottom: 24,
          borderRadius: 4,
          display: "inline-block",
          textAlign: "center",
        }}
        sx={{ background: "RGBA(256,256,256,0.1)" }}
        maxWidth="md"
        width="100%"
      >
        {loading ? (
          <>
            <Skeleton style={{ height: 40, marginBottom: 16 }} />

            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            <Typography
              textAlign="center"
              fontWeight="bold"
              variant="h6"
              color={theme.palette.secondary.light}
              marginTop={1}
              marginBottom={1}
            >
              {episode?.episode +
                " - " +
                episode?.name +
                " - " +
                episode?.air_date}
            </Typography>

            <Divider light textAlign="center">
              <Typography fontWeight="bold" variant="body1">
                Characters
              </Typography>
            </Divider>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 16,
              }}
            >
              {episode?.characters.map((r) => (
                <Card
                  key={r.id}
                  style={{
                    height: 40,
                    borderRadius: 20,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    width: "fit-content",
                    marginLeft: 8,
                    marginTop: 8,
                  }}
                >
                  <img
                    src={r.image}
                    style={{
                      borderRadius: 16,
                      width: 32,
                      height: 32,
                      margin: 4,
                    }}
                    loading="lazy"
                  />
                  <Typography
                    fontWeight="bold"
                    variant="body1"
                    style={{ marginRight: 8, marginLeft: 4 }}
                    className="links"
                    onClick={() => {
                      navigate("/" + RoutesList.characters + "/" + r.id);
                    }}
                  >
                    {r.name}
                  </Typography>
                </Card>
              ))}
            </div>
          </>
        )}
      </Box>
    </div>
  );
};

export default SingleEpisodePage;
