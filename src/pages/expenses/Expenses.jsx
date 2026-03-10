import { useState } from "react";

function Expenses({ budgets }) {
  const [budgetId, setBudgetId] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const expense = {
      budgetId,
      category,
      amount,
    };

    console.log(expense);
  };

  return (
    <form onSubmit={handleSubmit} className="ml-50 max-w-md space-y-4">
      <div>
        <label className="block mb-2">Select Budget</label>
        <select
          value={budgetId}
          onChange={(e) => setBudgetId(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Choose budget</option>
          {budgets?.map((budget) => (
            <option key={budget.id} value={budget.id}>
              {budget.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border rounded p-2"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border rounded p-2"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Expense
      </button>
    </form>
  );
}

export default Expenses;
