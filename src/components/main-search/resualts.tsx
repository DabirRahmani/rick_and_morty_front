import { useQuery } from "@apollo/client";
import { GET_SEARCH_OUTPUT } from "../../types/types";
import { GET_SEARCH } from "../../gql-functions";
import { useState } from "react";
import {
  Card,
  Divider,
  IconButton,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import RoutesList from "../../routes";

const MainSearchResaults = ({ searchText, close }: any) => {
  const [result, setResult] = useState<GET_SEARCH_OUTPUT>({
    characters: { results: [] },
    episodes: { results: [] },
    locations: { results: [] },
  });
  const { loading } = useQuery<GET_SEARCH_OUTPUT>(GET_SEARCH, {
    variables: {
      search: searchText,
    },
    onCompleted(data) {
      setResult(data);
    },
  });

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "80%",
        height: "80%",
        borderRadius: 8,
      }}
    >
      <Card
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 8,
          position: "relative",
          overflow: "auto",
          background: "#224F55",
        }}
      >
        <IconButton
          onClick={() => {
            close();
          }}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <ClearIcon />
        </IconButton>

        <Typography textAlign="center" variant="body1">
          Searching for{" "}
          <Typography
            textAlign="center"
            fontWeight="bold"
            variant="h6"
            color={theme.palette.secondary.light}
            display="contents"
            component="span"
          >
            {searchText}
          </Typography>
        </Typography>

        {loading ? (
          <>
            <Skeleton style={{ margin: 32, height: 48 }} />
            <Skeleton style={{ margin: 32, height: 48 }} />
            <Skeleton style={{ margin: 32, height: 48 }} />
            <Skeleton style={{ margin: 32, height: 48 }} />
            <Skeleton style={{ margin: 32, height: 48 }} />
            <Skeleton style={{ margin: 32, height: 48 }} />
          </>
        ) : (
          <>
            <Divider light textAlign="center" style={{ marginTop: 8 }}>
              <Typography fontWeight="bold" variant="body1">
                Characters
              </Typography>
            </Divider>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {result?.characters.results.length > 0 ? (
                <>
                  {result?.characters.results.map((c) => {
                    return (
                      <Card
                        key={c.id}
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
                          src={c.image}
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
                            navigate("/" + RoutesList.characters + "/" + c.id);
                            close();
                          }}
                        >
                          {c.name}
                        </Typography>
                      </Card>
                    );
                  })}
                </>
              ) : (
                <Typography
                  textAlign="center"
                  variant="body1"
                  style={{ margin: 8, width: "100%" }}
                >
                  Nothing found in characters
                </Typography>
              )}
            </div>
            <Divider light textAlign="center" style={{ marginTop: 8 }}>
              <Typography fontWeight="bold" variant="body1">
                Locations
              </Typography>
            </Divider>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {result?.locations.results.length > 0 ? (
                <>
                  {result?.locations.results.map((l) => {
                    return (
                      <Card
                        key={l.id}
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
                        <Typography
                          fontWeight="bold"
                          variant="body1"
                          style={{ marginRight: 8, marginLeft: 4 }}
                          className="links"
                          onClick={() => {
                            navigate("/" + RoutesList.places + "/" + l.id);
                            close();
                          }}
                        >
                          {l.name}
                        </Typography>
                      </Card>
                    );
                  })}
                </>
              ) : (
                <Typography
                  textAlign="center"
                  variant="body1"
                  style={{ margin: 8, width: "100%" }}
                >
                  Nothing found in locations
                </Typography>
              )}
            </div>
            <Divider light textAlign="center" style={{ marginTop: 8 }}>
              <Typography fontWeight="bold" variant="body1">
                Episodes
              </Typography>
            </Divider>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {result?.episodes.results.length > 0 ? (
                <>
                  {result?.episodes.results.map((e) => {
                    return (
                      <Card
                        key={e.id}
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
                        <Typography
                          fontWeight="bold"
                          variant="body1"
                          style={{ marginRight: 8, marginLeft: 4 }}
                          className="links"
                          onClick={() => {
                            navigate("/" + RoutesList.episodes + "/" + e.id);
                            close();
                          }}
                        >
                          {e.name}
                        </Typography>
                      </Card>
                    );
                  })}
                </>
              ) : (
                <Typography
                  textAlign="center"
                  variant="body1"
                  style={{ margin: 8, width: "100%" }}
                >
                  Nothing found in episodes
                </Typography>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default MainSearchResaults;
