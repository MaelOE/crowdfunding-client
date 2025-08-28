import "./App.css";
import StartupDetailsPage from "./pages/StartupDetailsPage";
import AllStartupsPage from "./pages/AllStartupsPage";
import AddStartupPage from "./pages/AddStartupPage";
import EditStartupPage from "./pages/EditStartupPage.jsx";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<AllStartupsPage />} />
        <Route path="/startups/:startupId" element={<StartupDetailsPage />} />
        <Route path="/startups/add" element={<AddStartupPage />} />
        <Route path="/startups/edit/:startupId" element={<EditStartupPage />} />
      </Routes>
    </div>
  );
}

export default App;
