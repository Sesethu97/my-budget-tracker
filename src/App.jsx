import Sidenav from "./components/sidenav/Sidenav";
import Dashboard from "./pages/dashboard/Dashboard";
import Landing from "./pages/landing/Landing";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Help from "./pages/help/Help";
import { useState } from "react";
import Popup from "./components/popup/Popup";
import Budget from "./pages/budget/Budget";
import Goals from "./pages/goals/Goals";
import AnalyticDashboard from "./pages/analytics/AnalyticDashboard";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import { AddAPhotoRounded } from "@mui/icons-material";

function App() {
  const location = useLocation();
  const showSidenav =
    location.pathname !== "/" && location.pathname !== "/signup";

  const [openPopUp, setOpenPopUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const initial = username ? username.substring(0, 2).toUpperCase() : "";

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleSave = () => {
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Profile pic:", profilePic);

    setOpenPopUp(false);
  };

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem("budgets");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <div className="flex min-h-screen">
      {showSidenav && (
        <Sidenav
          openPopup={() => setOpenPopUp(true)}
          email={email}
          username={username}
          profilePic={profilePic}
        />
      )}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route
            path="/"
            element={<Login setUsername={setUsername} setEmail={setEmail} />}
          />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={<Dashboard username={username} />}
          />
          <Route path="/help" element={<Help />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/analytics" element={<AnalyticDashboard />} />
        </Routes>
      </main>
      {openPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-backgroundColor/5 backdrop-blur-xs z-50">
          <Popup isOpen={openPopUp} isClosed={() => setOpenPopUp(false)}>
            <h2 className=" text-white text-lg font-bold mb-6">Edit profile</h2>

            <div className="flex justify-center mb-6 relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-linear-to-r from-purple-950 to-lilac flex items-center justify-center text-4xl font-semibold">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  initial
                )}
              </div>

              <input
                type="file"
                id="profilePicInput"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
              <button
                onClick={() =>
                  document.getElementById("profilePicInput").click()
                }
                className="absolute bottom-1 left-52 p-2  hover:bg-gray"
              >
                <AddAPhotoRounded className="text-white" />
              </button>
            </div>

            <div className="mb-4">
              <label className="text-sm text-white">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg bg-gray/50 border main-mainText border-mainText focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-white">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg bg-gray/50 text-mainText border border-mainText focus:outline-none "
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpenPopUp(false)}
                className="px-5 py-2 rounded-full bg-white text-mainText"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-full bg-lilac text-white "
              >
                Save
              </button>
            </div>
          </Popup>
        </div>
      )}
    </div>
  );
}

export default App;
