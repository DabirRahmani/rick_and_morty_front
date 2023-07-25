import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "./gql-functions";
import MainHeader from "./components/main-header/main-header";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  const { data, loading, error } = useQuery(GET_CHARACTERS(2));

  console.log("data", data);
  console.log("loading", loading);
  console.log("error", error);

  return (
    <div style={{ minHeight: "-webkit-fill-available" }}>
      <MainHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>landing page</div>} />
          <Route path="/characters" element={<div>list of chars page</div>} />
          <Route path="/characters/:charId" element={<div>single char</div>} />
          <Route path="/places" element={<div>list of places</div>} />
          <Route path="/places/:placeId" element={<div>single place</div>} />
          <Route path="/episodes" element={<div>list of episodes</div>} />
          <Route
            path="/episodes/:episodeId"
            element={<div>single episode</div>}
          />
          <Route path="*" element={<div>404 not found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
