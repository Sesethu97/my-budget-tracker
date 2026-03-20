import { useState, useEffect } from "react";

function BudgetForm({ closeModal, setBudgets, editingBudget }) {
  const [budgetName, setBudgetName] = useState("");
  const [income, setIncome] = useState("");
  const [month, setMonth] = useState("");
  const [expenses, setExpenses] = useState([{ category: "", amount: "" }]);
  const [showMonthExists, setShowMonthExists] = useState(false);

  useEffect(() => {
    if (editingBudget) {
      setBudgetName(editingBudget.name);
      setIncome(editingBudget.income);
      setMonth(editingBudget.month);
      setExpenses(editingBudget.expenses);
    } else {
      setBudgetName("");
      setIncome("");
      setMonth("");
      setExpenses([{ category: "", amount: "" }]);
    }
  }, [editingBudget]);

  const preset = [
    "Rent",
    "Utilities",
    "Groceries",
    "Transport",
    "Entertainment",
    "Savings",
    "Insurance",
    "Debt Payments",
    "Subscriptions",
    "Healthcare",
    "Education",
    "Miscellaneous",
    "Other",
  ];

  const addExpense = () => {
    setExpenses([...expenses, { category: "", amount: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...expenses];
    updated[index][field] = value;
    setExpenses(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingBudgets = JSON.parse(localStorage.getItem("budgets")) || [];

    if (!editingBudget) {
      const monthExists = existingBudgets.some((b) => b.month === month);

      if (monthExists) {
        setShowMonthExists(true);
        return;
      }
    }

    const savings =
      Number(income) -
      expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

    const newBudget = {
      id: editingBudget?.id || Date.now(),
      name: budgetName,
      month,
      income: Number(income),
      savings,
      expenses,
    };

    let updatedBudgets;

    if (editingBudget) {
      updatedBudgets = existingBudgets.map((b) =>
        b.id === editingBudget.id ? newBudget : b,
      );
    } else {
      updatedBudgets = [...existingBudgets, newBudget];
    }

    localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
    setBudgets(updatedBudgets);
    closeModal();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-125 max-h-[90vh] overflow-y-auto rounded-md p-6 shadow-2xl bg-primary text-white relative"
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 right-3 text-white text-lg"
        >
          ✕
        </button>

        <h2 className="text-center font-bold mb-6">Monthly Budget</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Budget Name
            </label>
            <input
              type="text"
              className="w-full border bg-secondary rounded p-2"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <div>
              <label className="block mb-2 text-sm font-medium">Income</label>
              <input
                type="number"
                className="w-full bg-secondary border rounded p-2"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Month</label>
              <input
                type="month"
                className="w-full bg-secondary border rounded p-2"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <h2 className="text-lg font-semibold">Expense Categories</h2>

          {expenses.map((expense, index) => (
            <div key={index} className="flex gap-3">
              <select
                value={expense.category}
                onChange={(e) =>
                  handleChange(index, "category", e.target.value)
                }
                className="flex-1 bg-secondary border rounded p-2"
              >
                <option value="">Select Category</option>
                {preset.map((cat, i) => (
                  <option key={i}>{cat}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Amount"
                value={expense.amount}
                onChange={(e) => handleChange(index, "amount", e.target.value)}
                className="w-32 bg-secondary border rounded p-2"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addExpense}
            className="text-magenta text-sm"
          >
            + Add Category
          </button>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="bg-magenta text-white px-4 py-2 rounded w-full"
          >
            Save Budget
          </button>
        </div>
      </form>

      {showMonthExists && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-bold mb-2">Duplicate Budget</h3>
            <p>A budget for this month already exists.</p>
            <button
              onClick={() => setShowMonthExists(false)}
              className="mt-4 w-full bg-magenta text-white rounded py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BudgetForm;
