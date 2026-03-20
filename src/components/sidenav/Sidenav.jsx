import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Popup from "../popup/Popup";
import SavingsIcon from "@mui/icons-material/Savings";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import AreaChartRoundedIcon from "@mui/icons-material/AreaChartRounded";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

function Sidenav() {
  return (
    <div>
      sidenav
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-40 w-48 h-full transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="bg-primary h-full px-3 py-3 overflow-y-auto">
          <div className="flex items-center gap-2 py-6">
            <SavingsIcon sx={{ fontSize: 40, fill: "url(#gradient)" }} />

            <p className="text-xl font-semibold text-textPrimary">BudgetPal</p>

            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#010200" />
                  <stop offset="100%" stopColor="#836ffe" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <ul className="space-y-4  text-l  pt-4 ">
            <li>
              <a
                href="/home"
                className="group flex items-center gap-2  py-1.5 rounded-sm"
              >
                <span className="w-1 h-5 rounded-full bg-transparent group-hover:bg-highlighter transition-all"></span>

                <HomeRoundedIcon className="text-textPrimary group-hover:text-highlighter transition-colors" />

                <span className="text-body text-textPrimary">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/budget"
                className="group flex items-center gap-2  py-1.5 rounded-sm"
              >
                <span className="w-1 h-5 rounded-full bg-transparent group-hover:bg-highlighter transition-all"></span>

                <AutoStoriesRoundedIcon className="text-textPrimary group-hover:text-highlighter transition-colors" />

                <span className="text-body text-textPrimary">Budget</span>
              </a>
            </li>
            <li>
              <a
                href="/home"
                className="group flex items-center gap-2  py-1.5 rounded-sm"
              >
                <span className="w-1 h-5 rounded-full bg-transparent group-hover:bg-highlighter transition-all"></span>

                <AreaChartRoundedIcon className="text-textPrimary group-hover:text-highlighter transition-colors" />

                <span className="text-text-textPrimary ">Goals</span>
              </a>
            </li>
            <li>
              <a
                href="/home"
                className="group flex items-center gap-2  py-1.5 rounded-sm"
              >
                <span className="w-1 h-5 rounded-full bg-transparent group-hover:bg-highlighter transition-all"></span>

                <AssessmentRoundedIcon className="text-textPrimary group-hover:text-highlighter transition-colors" />

                <span className="text-body text-textPrimary">Reports</span>
              </a>
            </li>
            <li>
              <a
                href="/help"
                className="group flex items-center gap-2  py-1.5 rounded-sm"
              >
                <span className="w-1 h-5 rounded-full bg-transparent group-hover:bg-highlighter transition-all"></span>

                <HelpRoundedIcon className="text-textPrimary group-hover:text-highlighter transition-colors" />

                <span className="text-body text-textPrimary">Help</span>
              </a>
            </li>
          </ul>
          <div className="space-y-4 font-bold text-l text-tertiary pt-4 pl-6 fixed bottom-0 left-0 right-0">
            <a
              href="/"
              className="flex items-center text-textPrimary px-2 py-1.5 text-body rounded-base hover:text-highlighter group"
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
