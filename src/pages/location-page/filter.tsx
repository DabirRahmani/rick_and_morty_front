import { CharacterFiltes, LocationFilters } from "../../types/types";
import { useState } from "react";
import { Button, TextField, useTheme } from "@mui/material";
import MainSelect from "../../components/select/main-select";
import Grid from "@mui/material/Grid";
import { DIMENSIONS, TYPES } from "./filterItems";

const LocationFiltering = ({
  setFilters,
}: {
  setFilters: (fil: LocationFilters) => any;
}) => {
  const [name, setName] = useState("");
  const [dimension, setDimension] = useState(0);
  const [type, setType] = useState(0);

  return (
    <div style={{ width: "100%" }}>
      <Grid
        style={{ justifyContent: "center", padding: 8 }}
        spacing={1}
        container
      >
        <Grid item xs={12} sm={6}>
          <div style={{ alignSelf: "center" }}>
            <TextField
              label="Name"
              color="secondary"
              variant="outlined"
              autoComplete=""
              fullWidth
              value={name}
              onChange={(value) => {
                setName(value.target.value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MainSelect
            title="Type"
            items={TYPES}
            selectedItem={type}
            setSelectedItem={setType}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MainSelect
            title="Dimension"
            items={DIMENSIONS}
            selectedItem={dimension}
            setSelectedItem={setDimension}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
              margin: 8,
            }}
          >
            <Button
              style={{ whiteSpace: "nowrap" }}
              size="large"
              variant="outlined"
              color="secondary"
              onClick={() => {
                setFilters({
                  type: type === 0 ? null : TYPES[type].name,
                  dimension:
                    dimension === 0 ? null : DIMENSIONS[dimension].name,
                  name: name === "" ? null : name,
                });
              }}
            >
              Apply
            </Button>
            <Button
              style={{ whiteSpace: "nowrap" }}
              size="large"
              variant="outlined"
              color="primary"
              onClick={() => {
                setFilters({
                  dimension: null,
                  name: null,
                  type: null,
                });
                setName("");
                setDimension(0);
                setType(0);
              }}
            >
              Restore Default
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LocationFiltering;
