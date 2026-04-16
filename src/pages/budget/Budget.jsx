import { useState, useEffect } from "react";
import BudgetForm from "../../components/budgetform/BudgetForm";
import AllocateSavings from "../../components/allocateSavings/AllocateSavings";
import budgetLogo from "../../assets/budgetLogo.png";

function Budget() {
  const [openBudget, setOpenBudget] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [editBudget, setEditBudget] = useState(null);
  const [selectedBudgets, setSelectedBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [openAllocate, setOpenAllocate] = useState(false);
  const [goals, setGoals] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [openMenuId, setOpenMenuId] = useState(null);

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const filteredBudgets = budgets.filter(
    (b) => b.month === selectedMonth.toISOString().slice(0, 7),
  );

  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");
    if (savedGoals) setGoals(JSON.parse(savedGoals));
  }, []);

  useEffect(() => {
    const savedBudgets = localStorage.getItem("budgets");
    if (savedBudgets) setBudgets(JSON.parse(savedBudgets));
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenuId]);

  const handleAllocate = (budget) => {
    setSelectedBudget(budget);
    setOpenAllocate(true);
  };

  const handleBudgetEdit = (budget) => {
    setEditBudget(budget);
    setOpenBudget(true);
  };

  const toggleBudgetSelection = (id) => {
    setSelectedBudgets((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id],
    );
  };

  const allSelected =
    budgets.length > 0 && selectedBudgets.length === budgets.length;

  const toggleSelectAll = () => {
    setSelectedBudgets(allSelected ? [] : budgets.map((b) => b.id));
  };

  const deleteSelectedBudgets = () => {
    setBudgets((prev) => {
      const remaining = prev.filter((b) => !selectedBudgets.includes(b.id));
      localStorage.setItem("budgets", JSON.stringify(remaining));
      return remaining;
    });
    setSelectedBudgets([]);
  };

  return (
    <main className="max-w-7xl mx-auto py-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Budget</h1>
          <p className="text-sm text-subText">
            Create and manage your monthly budgets
          </p>
        </div>

        <button
          onClick={() => setOpenBudget(true)}
          className="bg-sidebarHighlight px-4 py-2 rounded-full shadow-md hover:scale-105 transition"
        >
          + Create Budget
        </button>
      </div>

      {selectedBudgets.length > 0 && (
        <div className="mb-4">
          <button
            onClick={deleteSelectedBudgets}
            className="bg-red-500 px-4 py-2 rounded-lg"
          >
            Delete ({selectedBudgets.length})
          </button>
        </div>
      )}

      {filteredBudgets.length === 0 ? (
        <div className="text-center text-subText mt-20">
          <img src={budgetLogo} className="opacity-20 mx-auto block w-64" />
          <p className="mt-4">You haven't created any budgets yet</p>

          <button
            className="mt-4 bg-sidebarHighlight px-4 py-2 rounded-full"
            onClick={() => setOpenBudget(true)}
          >
            + Create Budget
          </button>
        </div>
      ) : (
        <div className="bg-mainText/30 rounded-xl p-4 shadow-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-subText uppercase text-xs tracking-wider border-b border-white/10">
              <tr>
                <th className="px-2 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-2 py-2 ">Budget Name</th>
                <th className="px-2 py-2 ">Month</th>
                <th className="px-2 py-2 ">Income</th>
                <th className="px-2 py-2 ">Savings</th>
                <th className="px-2 py-2 ">Progress</th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-default text-subText">
              {budgets.map((budget, index) => (
                <tr
                  key={budget.id}
                  className={`transition ${
                    index % 2 === 0 ? "bg-mainText/40" : "bg-mainText/50"
                  } hover:bg-mainText/60`}
                >
                  <td className="px-2 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedBudgets.includes(budget.id)}
                      onChange={() => toggleBudgetSelection(budget.id)}
                    />
                  </td>

                  <td className="px-2 py-2 text-subText">{budget.name}</td>
                  <td className="px-2 py-2 text-subText">{budget.month}</td>
                  <td className="px-2 py-2 text-subText">{budget.income}</td>
                  <td className="px-2 py-2 text-subText">{budget.savings}</td>

                  <td className="px-2 py-2">
                    <div className="w-full bg-subText rounded-full h-5 overflow-hidden">
                      <div
                        className="bg-sidebarHighlight h-full flex items-center px-2"
                        style={{
                          width: `${
                            budget.income
                              ? (budget.savings / budget.income) * 100
                              : 0
                          }%`,
                        }}
                      >
                        <p className="text-xs mt-1 text-white">
                          {budget.income
                            ? Math.round((budget.savings / budget.income) * 100)
                            : 0}
                          %
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-2 py-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        const rect = e.currentTarget.getBoundingClientRect();

                        setMenuPosition({
                          top: rect.bottom + 8,
                          left: rect.right - 120,
                        });

                        setOpenMenuId(
                          openMenuId === budget.id ? null : budget.id,
                        );
                      }}
                      className="p-1 rounded-full hover:bg-white/10"
                    >
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openMenuId && (
        <div
          className="fixed w-32 bg-sidebarColor border border-white/10 rounded-lg shadow-lg z-50"
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              const budget = budgets.find((b) => b.id === openMenuId);
              handleBudgetEdit(budget);
              setOpenMenuId(null);
            }}
            className="w-full text-left px-4 py-2 hover:bg-white/10"
          >
            Edit
          </button>
          <hr className="text-subText"></hr>
          <button
            onClick={() => {
              const budget = budgets.find((b) => b.id === openMenuId);
              handleAllocate(budget);
              setOpenMenuId(null);
            }}
            className="w-full text-left px-4 py-2 hover:bg-white/10"
          >
            Allocate
          </button>
        </div>
      )}

      {openBudget && (
        <div className="fixed inset-0 flex items-center justify-center bg-backgroundColor/5 backdrop-blur-xs z-50">
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

      {openAllocate && (
        <div className="fixed inset-0 flex items-center justify-center bg-backgroundColor/5 backdrop-blur-xs z-50">
          <AllocateSavings
            budget={selectedBudget}
            closeModal={() => setOpenAllocate(false)}
          />
        </div>
      )}
    </main>
  );
}

export default Budget;
