import CharacterRow from "./character-row";
import EpisodeRow from "./episode-row";
import LocationRow from "./location-row";

const LandingPage = () => {
  return (
    <div>
      <CharacterRow />
      <LocationRow />
      <EpisodeRow />
    </div>
  );
};

export default LandingPage;
