import { useEffect, useState } from "react";
import GoalsForm from "../../components/goalsform/GoalsForm";
import MonthPicker from "../../components/monthPicker/monthPicker";
import goalsLogo from "../../assets/goalsLogo.png";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function Goals() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [goals, setGoals] = useState([]);
  const [openGoals, setOpenGoals] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editGoals, setEditGoals] = useState(null);

  const itemsPerPage = 4;
  const visibleGoals = goals.slice(currentIndex, currentIndex + itemsPerPage);

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const handleGoalsEdit = (goal) => {
    setEditGoals(goal);
    setOpenGoals(true);
  };

  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenuId]);

  const handleOpenGoals = (e) => {
    e.preventDefault();
    setOpenGoals(true);
  };

  const getGoalsStatus = (goal) => {
    const saved = Number(goal.saved || 0);
    const target = Number(goal.target || 0);

    if (goal.cancelled) return "cancelled";
    if (saved === 0) return "not_started";
    if (saved >= target) return "completed";
    return "in_progress";
  };

  const goalStats = goals.reduce(
    (acc, goal) => {
      const status = getGoalsStatus(goal);

      acc[status] = (acc[status] || 0) + 1;

      return acc;
    },
    {
      not_started: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
    },
  );

  const handleDelete = (id) => {
    const existingGoals = JSON.parse(localStorage.getItem("goals")) || [];
    const updatedGoals = existingGoals.filter((g) => g.id !== id);

    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  };

  const getLast6MonthsData = () => {
    if (goals.length === 0) return [];

    const data = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(selectedMonth);
      d.setMonth(d.getMonth() - i);

      const monthKey = d.toISOString().slice(0, 7);

      const monthGoals = goals.filter((g) => g.deadline?.startsWith(monthKey));

      const saved = monthGoals.reduce(
        (sum, g) => sum + Number(g.saved || 0),
        0,
      );

      const target = monthGoals.reduce(
        (sum, g) => sum + Number(g.target || 0),
        0,
      );

      data.push({
        month: monthKey,
        saved,
        target,
      });
    }

    return data;
  };

  const chartData = getLast6MonthsData();

  return (
    <main className="px-4 text-mainHeading">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1 pb-6 text-left">
          <h1 className="text-3xl font-bold pt-4 pl-2 text-white">Goals</h1>
          <p className="text-md text-subText pl-2 ">
            Create financial goals and manage your savings
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-0.5">
          <span className="p-2 bg-sidebarColor text-white border border-subText rounded-full shadow-md hover:scale-105 transition">
            📅
          </span>

          <MonthPicker
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </div>

        {goals.length > 0 && (
          <button
            onClick={handleOpenGoals}
            className="p-2 text-white border bg-purpleshade border-mainText rounded-full shadow-md hover:scale-105 transition"
          >
            + Add Goal
          </button>
        )}
      </div>{" "}
      {goals.length === 0 ? (
        <div className="text-center text-subText mt-8">
          <img src={goalsLogo} className="opacity-20 mx-auto block w-150" />

          <p className="pb-4 text-md font-medium">
            {" "}
            You don’t have any goals yet
          </p>

          <button
            type="button"
            className="pt-2 p-2 text-white border bg-purpleshade border-mainText rounded-full shadow-md hover:scale-105 transition"
            onClick={handleOpenGoals}
          >
            + Add New Goal
          </button>
        </div>
      ) : (
        <>
          <div className="px-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleGoals.map((goal) => {
                const progress =
                  (Number(goal.saved) / Number(goal.target)) * 100;

                return (
                  <div
                    key={goal.id}
                    onClick={() => handleGoalsEdit(goal)}
                    className="flex flex-col items-start gap-4 w-full p-5 hover:shadow-xl border bg-sidebarColor border-mainText rounded-xl shadow-md transition"
                  >
                    <div className="flex justify-between items-center w-full">
                      <h5 className="text-2xl text-white font-bold">
                        {goal.name}
                      </h5>
                      <button
                        onClick={() => handleDelete(goal.id)}
                        className="text-sm text-sidebarColor font-bold"
                      >
                        ×
                      </button>{" "}
                    </div>

                    <p className="text-sm font-bold text-white text-header">
                      Due: {goal.deadline}
                    </p>

                    <p className="text-sm font-extrabold text-white text-header">
                      R{goal.saved}
                      <span className="text-sm text-subText">
                        {" "}
                        / R{goal.target}
                      </span>
                    </p>

                    <div className="w-full bg-subText rounded-full h-2 mt-3">
                      <div
                        className="bg-magenta h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="text-xs text-subText mt-2">
                      {progress.toFixed(0)}% complete
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <p
                onClick={() =>
                  setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0))
                }
                disabled={currentIndex === 0}
                className="px-4 py-2  text-white  disabled:opacity-50"
              >
                <ArrowBackIosNewRounded />
              </p>

              <p
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev + itemsPerPage >= goals.length
                      ? prev
                      : prev + itemsPerPage,
                  )
                }
                disabled={currentIndex + itemsPerPage >= goals.length}
                className="px-4 py-2  text-white  disabled:opacity-50"
              >
                <ArrowForwardIosRounded />
              </p>
            </div>
          </div>
          <div className="bg-neutral-primary-soft w-full mt-2 p-6 ">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-sidebarColor p-6 border border-default rounded-md shadow-xs">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h5 className="text-md text-white font-bold">
                      Goals Summary
                    </h5>
                  </div>
                </div>
                <div className="h-54 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient
                          id="savedColor"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#b65fcf"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#b65fcf"
                            stopOpacity={0}
                          />
                        </linearGradient>

                        <linearGradient
                          id="targetColor"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#34d399"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#34d399"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickFormatter={(m) =>
                          new Date(m + "-01").toLocaleString("default", {
                            month: "short",
                          })
                        }
                      />

                      <YAxis
                        tick={{ fill: "#aaa", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `R ${value.toLocaleString()}`}
                      />

                      <Tooltip
                        formatter={(value) => `R ${value}`}
                        contentStyle={{
                          backgroundColor: "#1f1f1f",
                          border: "none",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ color: "#fff", fontSize: "12px" }}
                      />

                      <Area
                        type="monotone"
                        dataKey="saved"
                        name="Amount Saved"
                        stroke="#b65fcf"
                        fill="url(#savedColor)"
                        strokeWidth={2}
                      />

                      <Area
                        type="monotone"
                        dataKey="target"
                        name="Target Goal"
                        stroke="#34d399"
                        fill="url(#targetColor)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex-1 min-h-75 bg-sidebarColor p-6 border border-default rounded-md shadow-xs">
                <h5 className="text-md text-white font-bold mb-4">
                  Goal Status
                </h5>

                <div className="h-[calc(100%-40px)] flex items-center">
                  <div className="grid grid-cols-2 gap-6 w-full">
                    <div className="flex justify-between text-subText">
                      <span>Not started</span>
                      <span className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-amber-400 text-amber-400 font-semibold">
                        {goalStats.not_started}
                      </span>
                    </div>

                    <div className="flex justify-between text-subText">
                      <span>In progress</span>
                      <span className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-orange-400 text-orange-400 font-semibold">
                        {goalStats.in_progress}
                      </span>
                    </div>

                    <div className="flex justify-between text-subText">
                      <span>Completed</span>
                      <span className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-green-400 text-green-400 font-semibold">
                        {goalStats.completed}
                      </span>
                    </div>

                    <div className="flex justify-between text-subText">
                      <span>Cancelled</span>
                      <span className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-red-400 text-red-400 font-semibold">
                        {goalStats.cancelled}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {openGoals && (
        <div className="fixed inset-0 flex items-center justify-center bg-backgroundColor/5 backdrop-blur-sm z-50">
          <GoalsForm
            closeModal={() => {
              setOpenGoals(false);
              setEditGoals(null);
            }}
            setGoals={setGoals}
            editingGoal={editGoals}
          />
        </div>
      )}
    </main>
  );
}

export default Goals;
