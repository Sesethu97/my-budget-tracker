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

  const filteredBudgets = budgets.filter(
    (b) => b.month === selectedMonth.toISOString().slice(0, 7),
  );
  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const handleAllocate = (budget) => {
    setSelectedBudget(budget);
    setOpenAllocate(true);
  };

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
    setBudgets((prevBudgets) => {
      const remaining = prevBudgets.filter(
        (b) => !selectedBudgets.includes(b.id),
      );

      localStorage.setItem("budgets", JSON.stringify(remaining));
      return remaining;
    });

    setSelectedBudgets([]);
  };
  return (
    <main className=" p-6  text-white">
      <h1 className="text-2xl font-bold">Budget</h1>
      <p className="mt-4 text-sm text-subText">
        {" "}
        Create and manage your monthly budgets
      </p>

      <div className="mt-4">
        <div className="py-4 flex items-center">
          {selectedBudgets.length > 0 && (
            <button
              onClick={deleteSelectedBudgets}
              className="bg-mainText text-white px-4 py-2 rounded-full"
            >
              Delete ({selectedBudgets.length})
            </button>
          )}
          {budgets.length === 0 ? (
            <button
              onClick={() => setOpenBudget(true)}
              className="ml-auto p-2 text-white border bg-sidebarHighlight border-mainText rounded-full shadow-md hover:scale-105 transition"
            >
              + Create Budget
            </button>
          ) : (
            ""
          )}
        </div>

        <div className="  relative overflow-x-auto ">
          {filteredBudgets.length === 0 ? (
            <div className="text-center text-subText">
              <img
                src={budgetLogo}
                className="opacity-20 mx-auto block w-140"
              />

              <p className="pb-4">You haven't created any budgets yet</p>

              <button
                className="pt-2 p-2 text-white border bg-sidebarHighlight border-mainText rounded-full shadow-md hover:scale-105 transition"
                onClick={() => setOpenBudget(true)}
              >
                + Create Budget
              </button>
            </div>
          ) : (
            <table className="w-full text-sm text-left text-body rounded-md overflow-hidden">
              <thead className="bg-mainText text-subText uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-bold">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-sidebarHighlight focus:ring-sidebarHighlight border-mainText rounded"
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
                  <th className="px-6 py-3 font-bold"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-default rounded-md overflow-hidden">
                {budgets.map((budget, index) => (
                  <tr
                    key={budget.id}
                    className={`transition ${
                      index % 2 === 0 ? "bg-mainText/40" : "bg-mainText/45"
                    } hover:bg-mainText/50`}
                  >
                    <td className="px-6 py-3 font-bold">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-sidebarHighlight focus:ring-sidebarHighlight border-mainText rounded"
                        checked={selectedBudgets.includes(budget.id)}
                        onChange={() => toggleBudgetSelection(budget.id)}
                      />
                    </td>
                    <th className="px-6 py-4 text-subText font-medium whitespace-nowrap">
                      {budget.name}
                    </th>
                    <td className="px-6 py-4 text-subText">{budget.month}</td>
                    <td className="px-6 py-4 text-subText">{budget.income}</td>
                    <td className="px-6 py-4 text-subText">{budget.savings}</td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-neutral-700 rounded-full h-5 relative overflow-hidden">
                        <div
                          className="bg-sidebarHighlight h-full rounded-full flex items-center px-2"
                          style={{
                            width: `${
                              budget.income
                                ? (budget.savings / budget.income) * 100
                                : 0
                            }%`,
                          }}
                        >
                          <span className="text-xs text-white font-medium">
                            {budget.income
                              ? Math.round(
                                  (budget.savings / budget.income) * 100,
                                )
                              : 0}
                            %
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleBudgetEdit(budget)}
                        className="px-3 py-1.5 text-sm rounded-md text-subText border border-white/10 
               hover:text-white hover:bg-mainText transition duration-200"
                      >
                        Edit
                      </button>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleAllocate(budget)}
                        className="px-4 py-1.5 text-sm rounded-md bg-sidebarHighlight text-white 
               hover:opacity-90 hover:scale-105 active:scale-95 
               transition duration-200 shadow-md"
                      >
                        Allocate
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
