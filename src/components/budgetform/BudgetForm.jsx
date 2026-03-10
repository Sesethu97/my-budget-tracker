import { useState } from "react";
import BudgetForm from "../../components/budgetform/BudgetForm";

function Budget() {
  const [openBudget, setOpenBudget] = useState(false);
  const [budgets, setBudgets] = useState([]);

  const addBudget = (newBudget) => {
    setBudgets([...budgets, newBudget]);
    setOpenBudget(false);
  };

  return (
    <>
      <div className="flex justify-between items-center px-10 mt-10">
        <h1 className="text-xl font-bold">Budgets</h1>

        <button
          onClick={() => setOpenBudget(true)}
          className="bg-magenta text-white px-4 py-2 rounded"
        >
          Create Budget
        </button>
      </div>

      <div className="ml-80 mt-10 w-225 overflow-x-auto bg-neutral-primary-soft shadow rounded-md border">
        <table className="w-full text-sm text-left">
          <thead className="bg-neutral-secondary-soft border-b">
            <tr>
              <th className="px-6 py-3">Budget Name</th>
              <th className="px-6 py-3">Month</th>
              <th className="px-6 py-3">Income</th>
              <th className="px-6 py-3">Savings</th>
            </tr>
          </thead>

          <tbody>
            {budgets.map((budget, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4">{budget.name}</td>
                <td className="px-6 py-4">{budget.month}</td>
                <td className="px-6 py-4">R {budget.income}</td>
                <td className="px-6 py-4">R {budget.savings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openBudget && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <BudgetForm
            closeModal={() => setOpenBudget(false)}
            onSave={addBudget}
          />
        </div>
      )}
    </>
  );
}

export default Budget;
