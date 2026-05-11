import { useState, useEffect } from "react";

function GoalsForm({ closeModal, setGoals, editingGoal }) {
  const [goalName, setGoalName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (editingGoal) {
      setGoalName(editingGoal.name || "");
      setTarget(editingGoal.target || "");
      setSaved(editingGoal.saved || "");
      setDeadline(editingGoal.deadline || "");
    } else {
      setGoalName("");
      setTarget("");
      setSaved("");
      setDeadline("");
    }
  }, [editingGoal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingGoals = JSON.parse(localStorage.getItem("goals")) || [];

    const newGoal = {
      id: editingGoal?.id || Date.now(),
      name: goalName,
      target,
      saved,
      deadline,
    };

    let updatedGoals;
    if (editingGoal) {
      updatedGoals = existingGoals.map((g) =>
        g.id === editingGoal.id ? newGoal : g,
      );
    } else {
      updatedGoals = [...existingGoals, newGoal];
    }

    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg w-125 max-h-[90vh] overflow-y-auto rounded-md p-6 shadow-2xl bg-sidebarColor text-white relative"
    >
      <button
        type="button"
        onClick={closeModal}
        className="absolute top-2 right-3 text-white text-lg"
      >
        X
      </button>

      <h2 className="text-center text-2xl font-bold mb-6">Financial Goals</h2>
      <div className="space-y-4">
        <div>
          <label className="block  mb-2 text-md font-medium">Goal Name</label>
          <input
            type="text"
            className="w-full mt-1 p-3 rounded-lg bg-subText/50 border border-mainText focus:outline-none"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block mb-2 text-dm font-medium">
              Target Amount
            </label>
            <input
              type="number"
              className="w-full mt-1 p-3 rounded-lg bg-subText/50 border border-mainText focus:outline-none"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            />
          </div>

          <div className="flex-1">
            <label className="block mb-2 text-md font-medium">
              Amount Saved
            </label>
            <input
              type="number"
              className="w-full mt-1 p-3 rounded-lg bg-subText/50 border border-mainText focus:outline-none"
              value={saved}
              onChange={(e) => setSaved(e.target.value)}
            />
          </div>

          <div className="flex-1">
            <label className="block mb-2 text-md font-medium">Deadline</label>
            <input
              type="date"
              className="w-full mt-1 p-3 rounded-lg bg-subText/50 border border-mainText focus:outline-none"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="px-5 py-2 rounded-full bg-purpleshade text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-full bg-white text-black "
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default GoalsForm;
