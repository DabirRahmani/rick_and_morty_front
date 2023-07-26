import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mdi/react";
import { mdiDiameterOutline, mdiAccountGroupOutline } from "@mdi/js";
import Typography from "@mui/material/Typography";
import { mdiMapMarkerQuestionOutline } from "@mdi/js";
import { LocationMini } from "../../types/types";
import "./style.css";
import { useNavigate } from "react-router-dom";
import RoutesList from "../../routes";

interface input {
  location: LocationMini;
}

const LocationCard = ({ location }: input) => {
  const navigate = useNavigate();

  return (
    <Grid key={location.id} item xs={6} md={3}>
      <Card style={{ height: 100, margin: 6 }}>
        <Typography
          variant="body1"
          fontWeight="bold"
          style={{ paddingLeft: 8 }}
          whiteSpace="nowrap"
          className="links"
          onClick={() => {
            navigate(RoutesList.places + "/" + location.id);
          }}
        >
          {location.name}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            style={{ marginRight: 4, marginLeft: 4 }}
            path={mdiMapMarkerQuestionOutline}
            size={1}
          />
          <Typography
            variant="body2"
            fontWeight="bold"
            onClick={() => {}}
            whiteSpace="nowrap"
          >
            {location.type}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            style={{ marginRight: 4, marginLeft: 4 }}
            path={mdiDiameterOutline}
            size={1}
          />
          <Typography
            variant="body2"
            fontWeight="bold"
            onClick={() => {}}
            whiteSpace="nowrap"
          >
            {location.dimension}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            style={{ marginRight: 4, marginLeft: 4 }}
            path={mdiAccountGroupOutline}
            size={1}
          />
          <Typography
            variant="body2"
            fontWeight="bold"
            onClick={() => {}}
            whiteSpace="nowrap"
          >
            {location.residents.length}
          </Typography>
        </div>
      </Card>
    </Grid>
  );
};

export default LocationCard;
