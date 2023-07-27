import { CharacterMini } from "../../types/types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { TruncateString } from "../../utils/utils";
import Icon from "@mdi/react";
import {
  mdiEmoticonDeadOutline,
  mdiEmoticonHappyOutline,
  mdiHelpCircleOutline,
} from "@mdi/js";
import "./style.css";
import { useNavigate } from "react-router-dom";
import RoutesList from "../../routes";
import { useTheme } from "@mui/material/styles";

interface input {
  character: CharacterMini;
}
const MainCharacterCard = ({ character }: input) => {
  const navigate = useNavigate();
  const theme = useTheme();


  return (
    <div style={{ marginLeft: 8, marginRight: 8, marginBottom: 8 }}>
      <Card
        style={{
          height: 120,
          display: "flex",
          flexDirection: "row",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 26,
            height: 26,
            background: "RGBA(256,256,256,0.5)",
            borderRadius: 4,
            top: 0,
            left: 0,
          }}
        >
          {character.status === "Dead" ? (
            <Icon path={mdiEmoticonDeadOutline} color="red" size={1} />
          ) : character.status === "Alive" ? (
            <Icon path={mdiEmoticonHappyOutline} color="green" size={1} />
          ) : (
            <Icon path={mdiHelpCircleOutline} size={1} />
          )}
        </div>
        <img
          alt={character.name}
          src={character.image}
          loading="lazy"
          width={120}
          height={120}
        />
        <div
          style={{
            height: 100,
            width: "100%",
            paddingLeft: 6,
            paddingRight: 6,
          }}
        >
          <Typography
            className="links"
            textAlign="center"
            fontWeight="bold"
            variant="h6"
            style={{ whiteSpace: "nowrap", wordWrap: "unset" }}
            onClick={() => {
              navigate("/" + RoutesList.characters + "/" + character.id);
            }}
            color={theme.palette.secondary.light}
          >
            {TruncateString(character.name, 21)}
          </Typography>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Typography variant="body1">Origin</Typography>
            <Typography
              className={character.origin.id !== null ? "links" : ""}
              variant="body1"
              fontWeight="bold"
              onClick={() => {
                if (character.origin.id !== null)
                  navigate("/" + RoutesList.places + "/" + character.origin.id);
              }}
            >
              {TruncateString(character.origin.name,20)}
            </Typography>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Typography variant="body1">Species</Typography>
            <Typography variant="body1" fontWeight="bold">
              {TruncateString(character.species)}
            </Typography>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Typography variant="body1">Location</Typography>
            <Typography
              className={character.location.id !== null ? "links" : ""}
              variant="body1"
              fontWeight="bold"
              onClick={() => {
                if (character.location.id !== null)
                  navigate("/"+RoutesList.places + "/" + character.location.id);
              }}
            >
              {TruncateString(character.location.name,18)}
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MainCharacterCard;
