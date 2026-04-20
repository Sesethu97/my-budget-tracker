import SavingsIcon from "@mui/icons-material/Savings";
import { NavLink } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutIcon from "@mui/icons-material/Logout";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import AreaChartRoundedIcon from "@mui/icons-material/AreaChartRounded";

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 py-2 px-3 rounded-full transition-all duration-200
        ${
          isActive
            ? "bg-linear-to-r from-purple-950 to-lilac text-white shadow-md"
            : "text-white hover:bg-white/5"
        }`
      }
    >
      <span className="text-inherit">{icon}</span>
      <span className="text-body">{label}</span>
    </NavLink>
  );
}

function Sidenav({ openPopup, userName, profilePic }) {
  const initial = userName ? userName.substring(0, 2).toUpperCase() : "";

  return (
    <aside className="w-52 h-screen sticky top-0 bg-sidebarColor flex flex-col justify-between">
      <div className="px-4 py-4">
        <div className="flex items-center gap-2 py-6">
          <SavingsIcon sx={{ fontSize: 40, fill: "url(#gradient)" }} />
          <p className="text-xl font-semibold text-white">BudgetPal</p>

          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b65fcf" />
                <stop offset="100%" stopColor="#8b008b" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="space-y-2 mt-8">
          <NavItem
            to="/dashboard"
            icon={<HomeRoundedIcon />}
            label="Dashboard"
          />
          <NavItem
            to="/budget"
            icon={<AutoStoriesRoundedIcon />}
            label="Budget"
          />
          <NavItem to="/goals" icon={<AreaChartRoundedIcon />} label="Goals" />
          <NavItem
            to="/analytics"
            icon={<AssessmentRoundedIcon />}
            label="Analytics"
          />
          <NavItem to="/help" icon={<HelpRoundedIcon />} label="Help" />
        </div>
      </div>

      <div className="px-4 pb-6 space-y-4">
        <button
          onClick={openPopup}
          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition"
        >
          {profilePic ? (
            <img
              src={profilePic}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-transparent hover:border-pink-400 transition"
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-linear-to-r from-purple-950 to-lilac text-white font-semibold">
              {initial || "U"}
            </div>
          )}
          <span className="text-white text-md">{userName}</span>
        </button>

        <NavItem to="/" icon={<LogoutIcon />} label="Log Out" />
      </div>
    </aside>
  );
}

export default Sidenav;
