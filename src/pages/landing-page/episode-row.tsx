import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../../gql-functions";
import { GET_EPISODES_OUTPUT } from "../../types/types";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

const EpisodeRow = () => {
  const { data, loading, error } = useQuery<{
    episodes: GET_EPISODES_OUTPUT;
  }>(GET_EPISODES);

  const theme = useTheme();


  return (
    <Box
      style={{
        marginTop: 24,
        marginBottom: 24,
        width: "100%",
        borderRadius: 4,
        paddingBottom: 8,
        paddingTop: 8,
      }}
      sx={{ background: "RGBA(256,256,256,0.1)" }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        textAlign="center"
        color={theme.palette.secondary.light}
      >
        Total Episodes: {data?.episodes.info.count} in 5 Seasons
      </Typography>
    </Box>
  );
};

export default EpisodeRow;
