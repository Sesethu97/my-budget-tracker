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

function App() {
  const location = useLocation();
  const showSidenav = location.pathname !== "/";

  const [openPopUp, setOpenPopUp] = useState(false);
  const [userName, setUserName] = useState("test case");
  const [displayName, setDisplayName] = useState("testcase");
  const [profilePic, setProfilePic] = useState(null);

  const initial = userName ? userName.substring(0, 2).toUpperCase() : "";

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleSave = () => {
    console.log("Username:", userName);
    console.log("Display name:", displayName);
    console.log("Profile pic:", profilePic);

    setOpenPopUp(false);
  };

  return (
    <div className="flex min-h-screen">
      {showSidenav && (
        <Sidenav
          openPopup={() => setOpenPopUp(true)}
          displayName={displayName}
          userName={userName}
          profilePic={profilePic}
        />
      )}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/home"
            element={<Dashboard displayName={displayName} />}
          />
          <Route path="/help" element={<Help />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/goals" element={<Goals />} />
        </Routes>
      </main>
      <Popup isOpen={openPopUp} isClosed={() => setOpenPopUp(false)}>
        <h2 className="text-xl text-mainHeading font-semibold mb-6">
          Edit profile
        </h2>

        <div className="flex justify-center mb-6 relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-highlighter to-logo flex items-center justify-center text-4xl font-semibold">
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
            onClick={() => document.getElementById("profilePicInput").click()}
            className="absolute bottom-2 left-[210px] p-2 bg-gray rounded-full hover:bg-gray-600"
          >
            📷
          </button>
        </div>

        <div className="mb-4">
          <label className="text-sm text-mainHeading">Display name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full mt-1 p-3 rounded-lg bg-gray/50 border border-gray focus:outline-none focus:border-gray-500"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm text-mainHeading">Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mt-1 p-3 rounded-lg bg-gray/50 border border-gray focus:outline-none focus:border-gray-500"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setOpenPopUp(false)}
            className="px-5 py-2 rounded-full bg-highlighter hover:bg-textSecondary"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-full bg-white text-black "
          >
            Save
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default App;
