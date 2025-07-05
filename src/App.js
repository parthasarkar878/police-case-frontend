import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ThanaDashboard from "./pages/ThanaDashboard";
import HqDashboard from "./pages/HqDashboard";
import EditCase from "./pages/EditCase";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/thana" element={<ThanaDashboard />} />
        <Route path="/hq" element={<HqDashboard />} />
        <Route path="/edit/:id" element={<EditCase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
