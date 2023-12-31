import { CharacterFiltes } from "../../types/types";
import { useState } from "react";
import { Button, TextField, useTheme } from "@mui/material";
import MainSelect from "../../components/select/main-select";
import Grid from "@mui/material/Grid";
import { GENDERS, SPECIES, STATUSES } from "./filterItems";

const CharacterFiltering = ({
  setFilters,
}: {
  setFilters: (fil: CharacterFiltes) => any;
}) => {
  const [gender, setGender] = useState(0);
  const [status, setStatus] = useState(0);
  const [name, setName] = useState("");
  const [species, setSpecies] = useState(0);

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
            title="species"
            items={SPECIES}
            selectedItem={species}
            setSelectedItem={setSpecies}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container>
            <Grid paddingRight={1} item xs={6}>
              <MainSelect
                title="gender"
                items={GENDERS}
                selectedItem={gender}
                setSelectedItem={setGender}
              />
            </Grid>
            <Grid item xs={6}>
              <MainSelect
                title="status"
                items={STATUSES}
                selectedItem={status}
                setSelectedItem={setStatus}
              />
            </Grid>
          </Grid>
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
                  status: status === 0 ? null : STATUSES[status].name,
                  gender: gender === 0 ? null : GENDERS[gender].name,
                  name: name === "" ? null : name,
                  species: species === 0 ? null : SPECIES[species].name,
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
                  gender: null,
                  name: null,
                  species: null,
                  status: null,
                });
                setName("");
                setSpecies(0);
                setStatus(0);
                setGender(0);
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

export default CharacterFiltering;
