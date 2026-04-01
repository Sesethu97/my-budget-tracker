import { useState } from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import { NavLink } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutIcon from "@mui/icons-material/Logout";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import AreaChartRoundedIcon from "@mui/icons-material/AreaChartRounded";

function Sidenav({ openPopup, displayName, userName, profilePic }) {
  const initial = userName ? userName.substring(0, 2).toUpperCase() : "";

  return (
    <div>
      <aside className="w-48 h-screen sticky top-0 bg-sidebarColor">
        <div className="bg-primary h-full px-3 py-3 overflow-y-auto">
          <div className="flex items-center gap-2 py-6">
            <SavingsIcon sx={{ fontSize: 40, fill: "url(#gradient)" }} />

            <p className="text-xl font-semibold text-white">BudgetPal</p>

            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8b008b" />
                  <stop offset="100%" stopColor="#fff" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <ul className="space-y-4  text-l  pt-10 ">
            <li>
              <NavLink
                to="/home"
                className="group flex items-center gap-2 py-1.5 rounded-sm"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`w-1 h-5 rounded-full transition-all ${
                        isActive ? "bg-sidebarHighlight" : "bg-transparent"
                      }`}
                    ></span>

                    <HomeRoundedIcon
                      className={`transition-colors ${
                        isActive
                          ? "text-sidebarHighlight"
                          : "text-white group-hover:text-sidebarHighlight"
                      }`}
                    />

                    <span
                      className={`text-body transition-colors ${
                        isActive
                          ? "text-sidebarHighlight"
                          : "text-white group-hover:text-sidebarHighlight"
                      }`}
                    >
                      Dashboard
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/budget"
                className="group flex items-center gap-2 py-2 rounded-sm"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`w-1 h-5 rounded-full transition-all ${
                        isActive ? "bg-sidebarHighlight" : "bg-transparent"
                      }`}
                    ></span>

                    <AutoStoriesRoundedIcon
                      className={`transition-colors ${
                        isActive
                          ? "text-sidebarHighlight"
                          : "text-white group-hover:text-sidebarHighlight"
                      }`}
                    />

                    <span
                      className={`text-body transition-colors ${
                        isActive
                          ? "text-sidebarHighlight"
                          : "text-white group-hover:text-sidebarHighlight"
                      }`}
                    >
                      Budget
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/goals"
                className="group flex items-center gap-2 py-2 rounded-sm"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`w-1 h-5 rounded-full transition-all ${
                        isActive ? "bg-sidebarHighlight" : "bg-transparent"
                      }`}
                    ></span>

                    <AreaChartRoundedIcon
                      className={`transition-colors ${
                        isActive
                          ? "text-sidebarHighlight"
                          : "text-white group-hover:text-sidebarHighlight"
                      }`}
                    />

                    <span
                      className={`text-body transition-colors ${
                        isActive
                          ? "text-sidebarHighlight"
                          : "text-white group-hover:text-sidebarHighlight"
                      }`}
                    >
                      Goals
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analytics"
                className="group flex items-center gap-2 py-2 rounded-sm"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`w-1 h-5 rounded-full transition-all ${
                        isActive ? "bg-sidebarHighlight" : "bg-transparent"
                      }`}
                    ></span>

                    <AssessmentRoundedIcon
                      className={`transition-colors ${
                        isActive
                          ? "text-sidebarHighlight"
                          : "text-white group-hover:text-sidebarHighlight"
                      }`}
                    />

                    <span
                      className={`text-body transition-colors ${
                        isActive
                          ? "text-sidebarHighlight"
                          : "text-white group-hover:text-sidebarHighlight"
                      }`}
                    >
                      Analytics
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/help"
                className="group flex items-center gap-2 py-2 rounded-sm"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`w-1 h-5 rounded-full transition-all ${
                        isActive ? "bg-sidebarHighlight" : "bg-transparent"
                      }`}
                    ></span>

                    <HelpRoundedIcon
                      className={`transition-colors ${
                        isActive
                          ? "text-sidebarHighlight"
                          : "text-white group-hover:text-sidebarHighlight"
                      }`}
                    />

                    <span
                      className={`text-body transition-colors ${
                        isActive
                          ? "text-sidebarHighlight"
                          : "text-white group-hover:text-sidebarHighlight"
                      }`}
                    >
                      Help
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
          <div className="space-y-4 font-bold text-l text-tertiary pt-4 pl-6 fixed bottom-0 left-0 right-0">
            <div className="ml-4">
              <button
                onClick={openPopup}
                className="flex items-center gap-3 cursor-pointer group"
              >
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="profile-pic"
                    className="w-20 h-20 rounded-full object-cover border-2 border-transparent group-hover:border-magenta transition"
                  />
                ) : (
                  <AccountCircleRoundedIcon
                    sx={{ fontSize: 60 }}
                    className="text-white group-hover:text-sidebarHighlight transition"
                  />
                )}
              </button>
            </div>
            <NavLink
              to="/"
              className="group flex items-center gap-2 py-1.5 rounded-sm"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`w-1 h-5 rounded-full transition-all ${
                      isActive ? "bg-sidebarHighlight" : "bg-transparent"
                    }`}
                  ></span>

                  <LogoutIcon
                    className={`transition-colors ${
                      isActive
                        ? "text-sidebarHighlight"
                        : "text-white group-hover:text-sidebarHighlight"
                    }`}
                  />

                  <span
                    className={`text-body transition-colors ${
                      isActive
                        ? "text-sidebarHighlight"
                        : "text-white group-hover:text-sidebarHighlight"
                    }`}
                  >
                    Log Out
                  </span>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </aside>
    </div>
  );
}
export default Sidenav;
