import { StackedBarChartRounded } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AllocateSavings({ budget, closeModal }) {
  const [goals, setGoals] = useState([]);
  const [allocations, setAllocations] = useState({});
  const navigation = useNavigate();

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(storedGoals);
  }, []);

  const handleChange = (goalId, value) => {
    setAllocations({
      ...allocations,
      [goalId]: Number(value),
    });
  };

  const handleSubmit = () => {
    const totalAllocated = Object.values(allocations).reduce(
      (sum, val) => sum + val,
      0,
    );

    if (totalAllocated > budget.savings) {
      alert("You are allocating more than your savings");
      return;
    }

    const updatedGoals = goals.map((goal) => {
      if (allocations[goal.id]) {
        return {
          ...goal,
          saved: Number(goal.saved) + Number(allocations[goal.id]),
        };
      }
      return goal;
    });

    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-105 max-h-[85vh] overflow-y-auto rounded-2xl bg-sidebarColor p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 text-white">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>

        <div className=" gap-3 mb-8">
          <div>
            <h1 className="text-xl font-semibold">Allocate Savings</h1>
            <p className="text-xs text-subText">
              Distribute your savings across goals
            </p>
          </div>
        </div>

        {goals.length > 0 ? (
          <>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-xl border border-white/5"
                >
                  <div className="font-medium">
                    <p className="text-md">{goal.name}</p>
                    <p className="text-sm  text-subText">Saved: {goal.saved}</p>
                  </div>

                  <input
                    type="number"
                    placeholder="0"
                    className="w-24 px-3 py-1.5 rounded-lg bg-white border border-mainText text-mainText text-md focus:outline-none "
                    onChange={(e) => handleChange(goal.id, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div
              className="mt-8 text-sm text-white cursor-pointer hover:underline"
              onClick={() => navigation("/goals")}
            >
              + Add New Savings Goal
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={closeModal}
                className="flex-1 py-2 rounded-full bg-white/5 hover:bg-white/10 transition text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="flex-1 py-2 rounded-full bg-sidebarHighlight  text-white text-sm font-medium hover:opacity-90 transition"
              >
                Save Allocation
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">
              <StackedBarChartRounded sx={{ fontSize: 35 }} />
            </div>
            <p className="text-sm text-subText mb-4">No savings goals yet</p>

            <button
              className="px-5 py-2 rounded-full bg-sidebarHighlight  text-white text-sm font-medium hover:opacity-90 transition"
              onClick={() => navigation("/goals")}
            >
              + Create New Goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllocateSavings;
