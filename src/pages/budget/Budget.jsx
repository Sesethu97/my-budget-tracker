import { useState, useEffect } from "react";
import BudgetForm from "../../components/budgetform/BudgetForm";

function Budget() {
  const [openBudget, setOpenBudget] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [editBudget, setEditBudget] = useState(null);
  const [selectedBudgets, setSelectedBudgets] = useState([]);

  const handleBudgetEdit = (budget) => {
    setEditBudget(budget);
    setOpenBudget(true);
  };

  useEffect(() => {
    const savedBudgets = localStorage.getItem("budgets");
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }
  }, []);

  const toggleBudgetSelection = (id) => {
    if (selectedBudgets.includes(id)) {
      setSelectedBudgets(selectedBudgets.filter((bid) => bid !== id));
    } else {
      setSelectedBudgets([...selectedBudgets, id]);
    }
  };

  const allSelected =
    budgets.length > 0 && selectedBudgets.length === budgets.length;
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedBudgets([]);
    } else {
      setSelectedBudgets(budgets.map((b) => b.id));
    }
  };

  const deleteSelectedBudgets = () => {
    const remaining = budgets.filter((b) => !selectedBudgets.includes(b.id));
    setBudgets(remaining);
    localStorage.setItem("budgets", JSON.stringify(remaining));
    setSelectedBudgets([]);
  };

  return (
    <div className="text-white">
      <div className="relative flex items-center px-10 mt-10">
        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold">
          Budgets
        </h1>
      </div>
      <div className="mt-5">
        <div className=" flex justify-end px-10">
          <button
            className="bg-magenta text-white px-4 py-2 rounded"
            onClick={() => setOpenBudget(true)}
          >
            Create Budget
          </button>
        </div>
        {selectedBudgets.length > 0 && (
          <div className="ml-56 mt-10">
            <button
              onClick={deleteSelectedBudgets}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete Selected ({selectedBudgets.length})
            </button>
          </div>
        )}

        <div className="ml-58 mt-10 mr-12 relative overflow-x-auto bg-gradient-to-br from-primary to-neutral-900 shadow-xl rounded-xl border border-default">
          {budgets.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              No budgets yet. Click{" "}
              <span className="text-magenta">Create Budget</span> to get
              started.
            </div>
          ) : (
            <table className="w-full text-sm text-left text-body">
              <thead className="bg-neutral-800 border-b border-default text-gray-300 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-bold">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 font-bold">Budget Name</th>
                  <th className="px-6 py-3 font-bold">Month</th>
                  <th className="px-6 py-3 font-bold">Income</th>
                  <th className="px-6 py-3 font-bold">Savings</th>
                  <th className="px-6 py-3 font-bold">Progress</th>
                  <th className="px-6 py-3 font-bold"></th>
                </tr>
              </thead>

              <tbody className="bg-secondary divide-y divide-default">
                {budgets.map((budget) => (
                  <tr
                    key={budget.id}
                    className="hover:bg-neutral-800/40 transition"
                  >
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={selectedBudgets.includes(budget.id)}
                        onChange={() => toggleBudgetSelection(budget.id)}
                      />
                    </td>
                    <th className="px-6 py-4 font-medium whitespace-nowrap">
                      {budget.name}
                    </th>
                    <td className="px-6 py-4">{budget.month}</td>
                    <td className="px-6 py-4">{budget.income}</td>
                    <td className="px-6 py-4">{budget.savings}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-neutral-800 rounded-full h-2">
                          <div
                            className="bg-magenta h-2 rounded-full"
                            style={{
                              width: `${
                                budget.income
                                  ? (budget.savings / budget.income) * 100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>

                        <span className="text-sm text-gray-300">
                          {budget.income
                            ? Math.round((budget.savings / budget.income) * 100)
                            : 0}
                          %
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleBudgetEdit(budget)}
                        className="px-3 py-1 rounded border border-default text-magenta hover:bg-neutral-800 transition"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {openBudget && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <BudgetForm
            closeModal={() => {
              setOpenBudget(false);
              setEditBudget(null);
            }}
            setBudgets={setBudgets}
            editingBudget={editBudget}
          />
        </div>
      )}
    </div>
  );
}

export default Budget;
