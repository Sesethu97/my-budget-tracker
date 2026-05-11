import { useState, useEffect } from "react";

function BudgetForm({ closeModal, setBudgets, editingBudget }) {
  const [budgetName, setBudgetName] = useState("");
  const [income, setIncome] = useState("");
  const [month, setMonth] = useState("");
  const [expenses, setExpenses] = useState([{ category: "", amount: "" }]);
  const [showMonthExists, setShowMonthExists] = useState(false);

  const isValidForm =
    budgetName.trim() !== "" &&
    income !== "" &&
    Number(income) > 0 &&
    month.trim() !== "" &&
    expenses.some((e) => e.category.trim() !== "" && Number(e.amount) > 0);

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
        setTimeout(() => {
          navigate("/Budget");
        }, 1000);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/2 backdrop-blur-none">
      <form
        onSubmit={handleSubmit}
        className="relative w-105 max-h-[85vh] overflow-y-auto rounded-2xl bg-sidebarColor p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 text-white"
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>
        <div className=" gap-3 mb-8">
          <div>
            <h1 className="text-xl font-semibold">Monthly Budget</h1>
            <p className="text-xs text-subText">
              Create your monthly saving budgets
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-md font-medium">
              Budget Name
            </label>
            <input
              type="text"
              className="w-full mt-1 p-3 rounded-lg bg-subText/50 border text-mainText border-mainText focus:outline-none"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <div>
              <label className="block mb-2 text-md font-medium">Income</label>
              <input
                type="number"
                className="w-full mt-1 p-3 rounded-lg bg-subText/50 border text-mainText border-mainText focus:outline-none"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-md font-medium">Month</label>
              <input
                type="month"
                className="w-full mt-1 p-3 rounded-lg bg-subText/50 border text-mainText border-mainText focus:outline-none"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <h2 className="text-lg font-semibold">Expense Categories</h2>

          {expenses.map((expense, index) => (
            <div key={index} className="flex gap-3 items-end">
              <div className="w-full">
                <select
                  value={expense.category}
                  onChange={(e) =>
                    handleChange(index, "category", e.target.value)
                  }
                  className="w-full mt-1 p-3 rounded-lg bg-subText/50 border text-mainText border-mainText focus:outline-none"
                >
                  <option value="">Select Category</option>
                  {preset.map((cat, i) => (
                    <option key={i}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <input
                  type="number"
                  placeholder="Amount"
                  value={expense.amount}
                  onChange={(e) =>
                    handleChange(index, "amount", e.target.value)
                  }
                  className="w-full mt-1 p-3 rounded-lg bg-subText/50 border text-mainText border-mainText focus:outline-none"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addExpense}
            className="text-white text-sm"
          >
            + Add Category
          </button>
        </div>
        <div className="mt-5 flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="px-5 py-2 rounded-full bg-white text-mainText"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!isValidForm}
            className={`px-5 py-2 rounded-full text-white ${
              isValidForm
                ? "bg-purpleshade hover:opacity-90"
                : "bg-gray-500 cursor-not-allowed opacity-50"
            }`}
          >
            Save
          </button>
        </div>
      </form>

      {showMonthExists && (
        <div className="fixed inset-0 flex items-center justify-center  z-50">
          <div className="relative bg-sidebarColor text-white rounded-lg p-6 w-80 shadow-lg">
            <button
              onClick={() => setShowMonthExists(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-lg"
            >
              ✕
            </button>

            <h1 className="text-lg font-bold mb-2">Duplicate Budget</h1>
            <p>A budget for this month already exists.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BudgetForm;
