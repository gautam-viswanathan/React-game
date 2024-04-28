import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import CopSelection from "./pages/copSelection/CopSelection";
import LocationSelection from "./pages/locationSelection/LocationSelection";
import VehicleSelection from "./pages/vehicleSelection/VehicleSelection";
import Results from "./pages/results/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="location" element={<LocationSelection />} />
        <Route path="cop" element={<CopSelection />} />
        <Route path="vehicle" element={<VehicleSelection />} />
        <Route path="results" element={<Results />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
