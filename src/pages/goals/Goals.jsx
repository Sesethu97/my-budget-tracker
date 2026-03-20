import { useEffect, useState } from "react";
import GoalsForm from "../../components/goalsform/GoalsForm";
import Budget from "../budget/Budget";

function Goals() {
  const [openGoal, setOpenGoal] = useState(false);
  const [goals, setGoals] = useState([]);
  const [editGoals, setEditGoals] = useState(null);

  const handleEditGoals = (goal) => {
    setEditGoals(Budget);
    setOpenGoal(true);
  };

  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);
  return (
    <div className=" text-white min-h-screen">
      <div className="flex justify-between items-center px-10 mt-10">
        <h1 className="ml-56 text-xl font-bold">Financial Goals</h1>
        <button
          className="bg-magenta text-white px-4 py-2 rounded"
          onClick={() => setOpenGoal(true)}
        >
          Create New Goal
        </button>
      </div>
      <table className="w-full text-sm text-left text-body">
        <thead className="bg-neutral-800 border-b border-default text-gray-300 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3 font-bold">Goals</th>
            <th className="px-6 py-3 font-bold">Target Amount</th>
            <th className="px-6 py-3 font-bold">Saved</th>
            <th className="px-6 py-3 font-bold">Deadline</th>
            <th className="px-6 py-3 font-bold">Progress</th>
            <th className="px-6 py-3 font-bold"></th>
          </tr>
        </thead>
        <tbody className="bg-secondary border-b border-default"></tbody>
      </table>

      {openGoal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <GoalsForm
            closeModal={() => {
              setOpenGoal(false);
              setEditGoals(null);
            }}
            setGoals={setGoals}
            editGoals={editGoals}
          />
        </div>
      )}
    </div>
  );
}

export default Goals;
