import MainHeader from "./components/main-header/main-header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import { Container } from "@mui/material";
import CharacterPage from "./pages/character-page";

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
        <Container maxWidth="lg" style={{overflowY:"auto"}}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/characters" element={<CharacterPage />} />
            <Route
              path="/characters/:charId"
              element={<div>single char</div>}
            />
            <Route path="/locations" element={<div>list of places</div>} />
            <Route path="/locations/:placeId" element={<div>single place</div>} />
            <Route path="/episodes" element={<div>list of episodes</div>} />
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
