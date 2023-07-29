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
import { GET_LOCATION_OUTPUT } from "../../types/types";
import { GET_LOCATION } from "../../gql-functions";
import RoutesList from "../../routes";

const SingleLocationPage = () => {
  const [location, setLocation] = useState<GET_LOCATION_OUTPUT>();
  const { locId } = useParams();
  const { loading } = useQuery<{
    location: GET_LOCATION_OUTPUT;
  }>(GET_LOCATION, {
    variables: {
      id: locId,
    },
    onCompleted(data) {
      setLocation(data.location);
    },
  });

  const theme = useTheme();

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
            <Skeleton style={{ height: 40, marginBottom: 16 }} />
            <Skeleton style={{ height: 32, marginBottom: 16 }} />
            <Skeleton style={{ height: 32, marginBottom: 16 }} />
            <Skeleton style={{ height: 32, marginBottom: 16 }} />
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
            >
              {location?.name}
            </Typography>
            <div
              style={{
                marginLeft: mormd ? 240 : morsm ? 100 : 20,
                marginRight: mormd ? 240 : morsm ? 100 : 20,
              }}
            >
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
                  {location?.type}
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
                  Dimension
                </Typography>
                <Typography fontWeight="bold" variant="body1">
                  {location?.dimension}
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
                  Number of residents
                </Typography>
                <Typography fontWeight="bold" variant="body1">
                  {location?.residents.length}
                </Typography>
              </div>
            </div>

            <Divider light textAlign="center">
              <Typography fontWeight="bold" variant="body1">
                Residents
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
              {location?.residents.map((r) => (
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
                    alt={r.name}
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

export default SingleLocationPage;
