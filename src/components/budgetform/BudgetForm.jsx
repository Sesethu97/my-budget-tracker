import { useState, useEffect } from "react";

function BudgetForm({ closeModal, setBudgets, editingBudget }) {
  const [budgetName, setBudgetName] = useState("");
  const [income, setIncome] = useState("");
  const [month, setMonth] = useState("");
  const [expenses, setExpenses] = useState([{ category: "", amount: "" }]);

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

    const savings =
      income - expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const newBudget = {
      id: editingBudget?.id || Date.now(),
      name: budgetName,
      month,
      income,
      savings,
      expenses,
    };
    const existingBudgets = JSON.parse(localStorage.getItem("budgets")) || [];
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
          <label className="block mb-2 text-sm font-medium">Budget Name</label>
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
              onChange={(e) => handleChange(index, "category", e.target.value)}
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
  );
}

export default BudgetForm;
