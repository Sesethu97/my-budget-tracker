import { useState, useEffect } from "react";
import BudgetForm from "../../components/budgetform/BudgetForm";

function Budget() {
  const [openBudget, setOpenBudget] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [editBudget, setEditBudget] = useState(null);

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

  return (
    <div className="text-white">
      <div className="flex justify-between items-center px-10 mt-10">
        <h1 className="ml-56 text-xl font-bold text-white">Budgets</h1>
        <button
          className="bg-magenta text-white px-4 py-2 rounded"
          onClick={() => setOpenBudget(true)}
        >
          Create Budget
        </button>
      </div>

      <div className="ml-56 m-10 relative overflow-x-auto bg-gradient-to-br from-primary to-neutral-900 shadow-2xl z-50 rounded-md border border-default">
        {budgets.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            No budgets yet. Click{" "}
            <span className="text-magenta">Create Budget</span> to get started.
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="bg-neutral-800 border-b border-default text-gray-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 font-bold">Budget Name</th>
                <th className="px-6 py-3 font-bold">Month</th>
                <th className="px-6 py-3 font-bold">Income</th>
                <th className="px-6 py-3 font-bold">Savings</th>
                <th className="px-6 py-3 font-bold">Progress</th>
                <th className="px-6 py-3 font-bold"></th>
              </tr>
            </thead>

            <tbody className="bg-secondary border-b border-default">
              {budgets.map((budget, index) => (
                <tr key={index}>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    {budget.name}
                  </th>
                  <td className="px-6 py-4">{budget.month}</td>
                  <td className="px-6 py-4">{budget.income}</td>
                  <td className="px-6 py-4">{budget.savings}</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-magenta h-2 rounded-full"
                        style={{
                          width: `${(budget.savings / budget.income) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleBudgetEdit(budget)}
                      className="text-magenta hover:underline"
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
