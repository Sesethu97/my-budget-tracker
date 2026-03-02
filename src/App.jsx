import Sidenav from "./components/sidenav/Sidenav";
import Dashboard from "./pages/dashboard/Dashboard";
import Landing from "./pages/landing/Landing";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Help from "./pages/help/Help";

function App() {
  const location = useLocation();
  const showSidenav = location.pathname != "/";

  return (
    <>
      {showSidenav && <Sidenav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </>
  );
}

export default App;
