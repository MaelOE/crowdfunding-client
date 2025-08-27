import "./App.css";
import StartupDetailsPage from "./pages/StartupDetailsPage";
import AllStartupsPage from "./pages/AllStartupsPage";
import AddStartupPage from "./pages/AddStartupPage";
import EditProjectPage from "./pages/EditStartupPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AllStartupsPage />} />
        <Route path="/startups/:startupId" element={<StartupDetailsPage />} />
        <Route path="/startups/add" element={<AddStartupPage />} />
        <Route path="/startups/edit/:startupId" element={<EditProjectPage />} />
      </Routes>
    </div>
  );
}

export default App;
