import { useState, useEffect } from "react";

function AllocateSavings({ budget, closeModal }) {
  const [goals, setGoals] = useState([]);
  const [allocations, setAllocations] = useState({});

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
    <div className="bg-menu p-6 rounded-lg w-[400px]">
      <h2 className="text-lg font-bold mb-4">
        Allocate Savings (R{budget.savings})
      </h2>

      {goals.map((goal) => (
        <div key={goal.id} className="flex justify-between mb-3">
          <span>{goal.name}</span>
          <input
            type="number"
            className="border p-1 w-24"
            onChange={(e) => handleChange(goal.id, e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-magenta text-white w-full py-2 rounded mt-4"
      >
        Save Allocation
      </button>
    </div>
  );
}
export default AllocateSavings;
