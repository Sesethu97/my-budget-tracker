import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Popup from "../popup/Popup";

function Sidenav() {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [userName, setUserName] = useState("test case");
  const [displayName, setDisplay] = useState("tastcase");
  const [profilePic, setProfilePic] = useState(null);
  const initial = userName ? userName.substring(0, 2).toUpperCase() : "";

  const handleOpenPopUp = () => {
    setOpenPopUp(true);
  };

  const handleClosePopUp = () => {
    setOpenPopUp(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Profile Pic:", profilePic);
    console.log("Username:", userName);
    console.log("Display Name:", displayName);
    handleClosePopUp();
  };
  return (
    <div>
      sidenav
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-40 w-48 h-full transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="bg-primary h-full px-3 py-3 overflow-y-auto text-tertiary">
          <span className="text-tertiary flex items-center justify-center py-2">
            {profilePic ? (
              <img
                s
                onClick={handleOpenPopUp}
                rc={profilePic}
                alt="profile-pic"
              />
            ) : (
              <div
                onClick={handleOpenPopUp}
                className="w-32 h-32 rounded-full bg-pink-400 flex items-center justify-center text-4xl font-semibold"
              >
                {initial}
              </div>
            )}
          </span>
          <Popup isOpen={openPopUp} isClosed={handleClosePopUp}>
            <h2 className="text-xl font-semibold mb-6">Edit profile</h2>

            <div className="flex justify-center mb-6 relative">
              <span className="w-32 h-32 rounded-full bg-pink-400 flex items-center justify-center text-4xl font-semibold">
                {initial}
              </span>

              <button className="absolute bottom-2 right-[160px] bg-[#2c2c2c] p-2 rounded-full border border-gray-600">
                📷
              </button>
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-400">Display name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplay(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-400">Username</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:border-gray-500"
              />
              <p className="text-xs text-gray-500 mt-3 text-center">
                Your profile helps people recognize you. Your name and username
                are also used in the Sora app.
              </p>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={handleClosePopUp}
                className="px-5 py-2 rounded-full bg-[#2c2c2c] hover:bg-[#3a3a3a]"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-full bg-white text-black hover:bg-gray-200"
              >
                Save
              </button>
            </div>
          </Popup>

          <ul className="space-y-4 font-bold text-l text-tertiary pt-4 pl-6">
            <li>
              <a
                href="#"
                className="flex items-center px-2 py-1.5 text-body  hover:text-red-200 group"
              >
                Dashboard
              </a>
            </li>

            <li>
              {" "}
              <a
                href="#"
                className="flex items-center px-2 py-1.5 text-body  hover:text-red-200 group"
              >
                Bugdet
              </a>
            </li>
            <li>
              {" "}
              <a
                href="#"
                className="flex items-center px-2 py-1.5 text-body  hover:text-red-200 group"
              >
                Goals
              </a>
            </li>
            <li>
              {" "}
              <a
                href="#"
                className="flex items-center px-2 py-1.5 text-body rounded-base hover:text-red-200 group"
              >
                Reports
              </a>
            </li>
            <li>
              {" "}
              <a
                href="/help"
                className="flex items-center px-2 py-1.5 text-body rounded-base hover:text-red-200 group"
              >
                Help
              </a>
            </li>
          </ul>
          <div className="space-y-4 font-bold text-l text-tertiary pt-4 pl-6 fixed bottom-0 left-0 right-0">
            <a
              href="/"
              className="flex items-center px-2 py-1.5 text-body rounded-base hover:text-red-200 group"
            >
              Sign Out
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
export default Sidenav;
