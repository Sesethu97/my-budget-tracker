import { useEffect, useState } from "react";
import GoalsForm from "../../components/goalsform/GoalsForm";
import MonthPicker from "../../components/monthPicker/monthPicker";

function Goals() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [goals, setGoals] = useState([]);
  const [openGoals, setOpenGoals] = useState(false);

  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const handleOpenGoals = () => {
    setOpenGoals(true);
  };

  return (
    <main className="px-4 text-mainHeading">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1 pb-6 text-left">
          <h1 className="text-3xl font-bold pt-4 pl-2">Goals</h1>
          <p className="text-sm text-textSecondary pl-2 pb-4">
            Create financial goals and manage your savings
          </p>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 px-4">
        <span className="p-2 text-menu border border-gray rounded-full shadow-md hover:scale-105 transition">
          📅
        </span>

        <MonthPicker
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />

        {goals.length > 0 && (
          <button
            onClick={handleOpenGoals}
            className="bg-magenta text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transition"
          >
            + Add Goal
          </button>
        )}
      </div>

      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          <p className="text-textSecondary mb-4">
            You don’t have any goals yet
          </p>

          <button
            onClick={handleOpenGoals}
            className="bg-magenta text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition"
          >
            + Set New Goals
          </button>
        </div>
      ) : (
        <div className="px-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {goals.map((goal) => {
              const progress = (Number(goal.saved) / Number(goal.target)) * 100;

              return (
                <div
                  key={goal.id}
                  className="bg-white rounded-xl shadow-md p-4 border"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{goal.name}</h3>
                    <button className="text-sm">x</button>
                  </div>

                  <p className="text-sm text-gray-500 mb-2">
                    Due: {goal.deadline}
                  </p>

                  <h2 className="text-xl font-bold">
                    R{goal.saved}
                    <span className="text-sm text-gray-400">
                      {" "}
                      / R{goal.target}
                    </span>
                  </h2>

                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div
                      className="bg-magenta h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    {progress.toFixed(0)}% complete
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {openGoals && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <GoalsForm
            closeModal={() => setOpenGoals(false)}
            setGoals={setGoals}
          />
        </div>
      )}
    </main>
  );
}

export default Goals;
