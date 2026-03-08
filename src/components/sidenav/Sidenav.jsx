import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Popup from "../popup/Popup";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import AreaChartRoundedIcon from "@mui/icons-material/AreaChartRounded";

function Sidenav({ openPopup, displayName, userName, profilePic }) {
  const initial = userName ? userName.substring(0, 2).toUpperCase() : "";

  return (
    <div>
      sidenav
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-40 w-48 h-full transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="bg-primary h-full px-3 py-3 overflow-y-auto text-white">
          <span className="text-white flex items-center justify-center py-2">
            {profilePic ? (
              <img
                onClick={openPopup}
                src={profilePic}
                alt="profile-pic"
                className="w-24 h-24 rounded-full cursor-pointer"
              />
            ) : (
              <div className="flex-col">
                <div
                  onClick={openPopup}
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-deep-magenta to-royal-purple  flex items-center justify-center text-4xl font-semibold"
                >
                  {initial}
                </div>
                <p className="text-white capitalize size-12 mt-4 flex text-center ml-2">
                  {displayName}
                </p>
              </div>
            )}
          </span>

          <ul className="space-y-4 font-bold text-l text-tertiary pt-2 ">
            <li>
              <a
                href="#"
                className="flex gap-2  px-2 py-1.5 text-body  hover:bg-secondary rounded-sm hover:text-pink-600 group"
              >
                <HomeRoundedIcon />
                Dashboard
              </a>
            </li>

            <li>
              {" "}
              <a
                href="#"
                className="flex gap-2 px-2 py-1.5 text-body  hover:bg-secondary rounded-sm hover:text-pink-600 group"
              >
                <AutoStoriesRoundedIcon />
                Bugdet
              </a>
            </li>
            <li>
              {" "}
              <a
                href="#"
                className="flex gap-2  px-2 py-1.5 text-body  hover:bg-secondary rounded-sm hover:text-pink-600 group"
              >
                <AreaChartRoundedIcon />
                Goals
              </a>
            </li>
            <li>
              {" "}
              <a
                href="#"
                className="flex gap-2 px-2 py-1.5 text-body  hover:bg-secondary rounded-sm hover:text-pink-600 group"
              >
                <AssessmentRoundedIcon />
                Reports
              </a>
            </li>
            <li>
              {" "}
              <a
                href="/help"
                className="flex gap-2  px-2 py-1.5 text-body  hover:bg-secondary rounded-sm hover:text-pink-600 group"
              >
                <HelpRoundedIcon />
                Help
              </a>
            </li>
          </ul>
          <div className="space-y-4 font-bold text-l text-tertiary pt-4 pl-6 fixed bottom-0 left-0 right-0">
            <a
              href="/"
              className="flex items-center px-2 py-1.5 text-body rounded-base hover:text-pink-600 group"
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
