import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../../gql-functions";
import { GET_CHARACTER_OUTPUT } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { mdiMenuDown, mdiMenuUp } from "@mdi/js";
import Icon from "@mdi/react";
import RoutesList from "../../routes";

const SingleCharacterPage = () => {
  const [character, setCharacter] = useState<GET_CHARACTER_OUTPUT>();
  const { charId } = useParams();
  const { loading } = useQuery<{
    character: GET_CHARACTER_OUTPUT;
  }>(GET_CHARACTER, {
    variables: {
      id: charId,
    },
    onCompleted(data) {
      setCharacter(data.character);
    },
  });

  const theme = useTheme();

  const [extendMore, setExtendMore] = useState(false);

  const navigate = useNavigate();

  const mormd = useMediaQuery(theme.breakpoints.up("md"));
  const morsm = useMediaQuery(theme.breakpoints.up("sm"));

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
            <Grid container columns={12}>
              <Grid item xs={12} sm={4}>
                <Skeleton width="100%" height={300} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  paddingLeft: mormd ? 80 : morsm ? 30 : 20,
                  paddingRight: mormd ? 80 : morsm ? 30 : 20,
                }}
              >
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Grid>
              <Grid
                style={{ marginLeft: 16, marginRight: 16, marginTop: 16 }}
                item
                xs={12}
              >
                <Skeleton />
                <Skeleton />
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid container columns={12}>
            <Grid item xs={12} sm={4}>
              <img
                width="100%"
                src={character?.image}
                loading="lazy"
                style={{
                  marginLeft: mormd ? 32 : morsm ? 12 : 0,
                  marginTop: mormd ? 32 : morsm ? 12 : 0,
                  borderRadius: morsm ? 16 : 4,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                paddingLeft: mormd ? 80 : morsm ? 30 : 20,
                paddingRight: mormd ? 80 : morsm ? 30 : 20,
              }}
            >
              <Typography
                textAlign="center"
                fontWeight="bold"
                variant="h6"
                color={theme.palette.secondary.light}
              >
                {character?.name}
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="" variant="body1">
                  Status
                </Typography>
                <Typography fontWeight="bold" variant="body1">
                  {character?.status}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="" variant="body1">
                  Species
                </Typography>
                <Typography fontWeight="bold" variant="body1">
                  {character?.species}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="" variant="body1">
                  Gender
                </Typography>
                <Typography fontWeight="bold" variant="body1">
                  {character?.gender}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="" variant="body1">
                  Type
                </Typography>
                <Typography fontWeight="bold" variant="body1">
                  {character?.type === "" ? "not specified" : character?.type}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                }}
                onClick={() => {
                  if (character?.location.id !== null)
                    navigate(
                      "/" + RoutesList.places + "/" + character?.location.id
                    );
                }}
                className={character?.location.id !== null ? "links" : ""}
              >
                <Typography fontWeight="" variant="body1">
                  Location
                </Typography>
                <Typography fontWeight="bold" variant="body1">
                  {character?.location.name}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                }}
                onClick={() => {
                  if (character?.location.id !== null)
                    navigate(
                      "/" + RoutesList.places + "/" + character?.origin.id
                    );
                }}
                className={character?.origin.id !== null ? "links" : ""}
              >
                <Typography fontWeight="" variant="body1">
                  Origin
                </Typography>
                <Typography fontWeight="bold" variant="body1">
                  {character?.origin.name}
                </Typography>
              </div>
            </Grid>
            <Grid
              style={{ marginLeft: 16, marginRight: 16, marginTop: 16 }}
              item
              xs={12}
            >
              <Divider style={{ marginBottom: 8 }} light textAlign="center">
                <Typography fontWeight="bold" variant="body1">
                  Episodes Appeared in
                </Typography>
              </Divider>
              {character?.episode
                .slice(0, extendMore ? character?.episode.length : 4)
                .map((e) => {
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
                          navigate("/" + RoutesList.episodes + "/" + e.id);
                        }}
                      >
                        {e.episode + " - "}
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
              {character?.episode.length !== undefined &&
              character?.episode.length > 4 ? (
                <>
                  <Button
                    onClick={() => {
                      setExtendMore(!extendMore);
                    }}
                  >
                    {extendMore ? <>Show less</> : <>Extend More</>}

                    {extendMore ? (
                      <Icon path={mdiMenuUp} size={1} />
                    ) : (
                      <Icon path={mdiMenuDown} size={1} />
                    )}
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default SingleCharacterPage;
