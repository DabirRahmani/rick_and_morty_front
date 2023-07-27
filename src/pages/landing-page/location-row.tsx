import { useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "../../gql-functions";
import { GET_LOCATIONS_OUTPUT } from "../../types/types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Skeleton, useTheme } from "@mui/material";
import LocationCard from "../../components/cards/location-card";
import Typography from "@mui/material/Typography";

const LocationRow = () => {
  const { data, loading } = useQuery<{
    locations: GET_LOCATIONS_OUTPUT;
  }>(GET_LOCATIONS, {
    variables: {
      page: Math.floor(Math.random() * 5),
    },
  });

  const theme = useTheme();

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
      <Typography
        variant="h6"
        fontWeight="bold"
        textAlign="center"
        color={theme.palette.secondary.light}
      >
        Random Locations
      </Typography>
      {loading ? (
        <Grid container>
          <Grid item xs={6} md={3}>
            <Card style={{ height: 100, margin: 16 }}>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card style={{ height: 100, margin: 16 }}>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card style={{ height: 100, margin: 16 }}>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card style={{ height: 100, margin: 16 }}>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          {data?.locations.results
            .slice(
              Math.floor(Math.random() * (data?.locations.results.length - 5))
            )
            .slice(0, 4)
            .map((l) => {
              return <LocationCard location={l} key={l.id} />;
            })}
        </Grid>
      )}
    </Box>
  );
};

export default LocationRow;
