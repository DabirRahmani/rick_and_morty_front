import MainHeader from "./components/main-header/main-header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import { Container } from "@mui/material";
import CharacterPage from "./pages/character-page";
import EpisodePage from "./pages/episode-page";
import LocationPage from "./pages/location-page";
import SingleCharacterPage from "./pages/single-character-page";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#093b42",
      }}
    >
      <BrowserRouter>
        <MainHeader />
        <Container maxWidth="lg" style={{ overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/characters" element={<CharacterPage />} />
            <Route
              path="/characters/:charId"
              element={<SingleCharacterPage />}
            />
            <Route path="/locations" element={<LocationPage />} />
            <Route
              path="/locations/:placeId"
              element={<div>single place</div>}
            />
            <Route path="/episodes" element={<EpisodePage />} />
            <Route
              path="/episodes/:episodeId"
              element={<div>single episode</div>}
            />
            <Route path="*" element={<div>404 not found</div>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
