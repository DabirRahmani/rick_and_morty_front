import { useQuery } from "@apollo/client";
import { GET_LOCATIONS_OUTPUT, LocationMini } from "../../types/types";
import { GET_LOCATIONS } from "../../gql-functions";
import { useRef, useState } from "react";
import useOnScreen from "../../utils/hooks";
import { Box } from "@mui/material";

const LocationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [locations, setLocations] = useState<LocationMini[]>([]);
  const [filterDropMenuStatus, setFilterDropMenuStatus] = useState(false);
  const [filters, setFilters] = useState({
    status: null,
    gender: null,
    name: null,
    species: null,
  });
  const [filtersForSearch, setFiltersForSearch] = useState({
    status: null,
    gender: null,
    name: null,
    species: null,
  });
  const { data, loading } = useQuery<{
    characters: GET_LOCATIONS_OUTPUT;
  }>(GET_LOCATIONS, {
    variables: {
      page: currentPage,
      ...filtersForSearch,
    },
    onCompleted(data) {
      setLocations([...locations, ...data.characters.results]);
    },
  });

  const bottomRef = useRef();
  const reachedBottom = useOnScreen(bottomRef);

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
      <div ref={bottomRef as any} />
    </Box>
  );
};

export default LocationPage;
