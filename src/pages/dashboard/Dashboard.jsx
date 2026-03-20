import { useState, useEffect } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

function Dashboard({ openPopup, displayName, userName, profilePic }) {
  const initial = userName ? userName.substring(0, 2).toUpperCase() : "";
  const [budgets, setBudgets] = useState([]);

  console.log("initial dashboard", initial);
  console.log("initial displayName", displayName);
  console.log("initial userName", userName);
  console.log("initial profilepic", profilePic);

  useEffect(() => {
    const savedBudgets = localStorage.getItem("budgets");

    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }
  }, []);

  const currentMonth = new Date().toISOString().slice(0, 7);
  const currentMonthBudgets = budgets.filter(
    (budget) => budget.month === currentMonth,
  );

  console.log(budgets.savings);

  const totalIncome = currentMonthBudgets.reduce(
    (sum, budget) => sum + Number(budget.income),
    0,
  );

  const totalSavings = currentMonthBudgets.reduce(
    (sum, budget) => sum + Number(budget.savings),
    0,
  );

  const totalExpenses = currentMonthBudgets.reduce((sum, budget) => {
    const expensesTotal = budget.expenses.reduce(
      (expSum, exp) => expSum + Number(exp.amount),
      0,
    );
    return sum + expensesTotal;
  }, 0);

  const savingsRate =
    totalIncome > 0 ? ((totalSavings / totalIncome) * 100).toFixed(1) : 0;

  const totalBalance = totalIncome - totalExpenses;

  console.log(totalIncome);
  return (
    <main className="ml-48 py-2 px-4 text-center text-textPrimary">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1 text-left">
          <h1 className="text-2xl font-bold">Hi {displayName}</h1>
          <p>Welcome back!</p>
        </div>

        <span className="flex items-center justify-center">
          <button
            onClick={openPopup}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="profile-pic"
                className="w-24 h-24 rounded-full object-cover border-2 border-transparent group-hover:border-magenta transition"
              />
            ) : (
              <div className="relative ">
                <AccountCircleRoundedIcon
                  sx={{ fontSize: 90 }}
                  className="text-gray-400 group-hover:text-magenta transition"
                />
              </div>
            )}

            <p className="text-sm text-gray-300 group-hover:text-white transition capitalize">
              {displayName}
            </p>
          </button>
        </span>
      </div>
      <div className=" flex flex-row">
        <div className="flex flex-row gap-3 pt-4">
          <div className="flex flex-row">
            <a
              href="#"
              className="bg-neutral-primary-soft flex items-center justify-between max-w-sm p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium"
            >
              <h5 className="text-2xl font-semibold tracking-tight text-heading leading-8">
                Total Balance
              </h5>

              <div className="w-24 h-24 border border-amber-200 rounded-full flex items-center justify-center">
                <p className="text-body">R {totalBalance}</p>
              </div>
            </a>
          </div>
          <div className="flex flex-row">
            <a
              href="#"
              className="bg-neutral-primary-soft flex items-center justify-between max-w-sm p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium"
            >
              <h5 className="text-2xl font-semibold tracking-tight text-heading leading-8">
                Monthly Income
              </h5>

              <div className="w-24 h-24 border border-amber-200 rounded-full flex items-center justify-center">
                <p className="text-body">R {totalIncome}</p>
              </div>
            </a>
          </div>
          <div className="flex flex-row">
            <a
              href="#"
              className="bg-neutral-primary-soft flex items-center justify-between max-w-sm p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium"
            >
              <h5 className="text-2xl font-semibold tracking-tight text-heading leading-8">
                Monthly Expenses
              </h5>

              <div className="w-24 h-24 border border-amber-200 rounded-full flex items-center justify-center">
                <p className="text-body">R {totalExpenses}</p>
              </div>
            </a>
          </div>
          <div className="flex flex-row">
            <a
              href="#"
              className="bg-neutral-primary-soft flex items-center justify-between max-w-sm p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium"
            >
              <h5 className="text-2xl font-semibold tracking-tight text-heading leading-8">
                Saving Rate{" "}
              </h5>

              <div className="w-24 h-24 border border-amber-200 rounded-full flex items-center justify-center">
                <p className="text-body">R {savingsRate}</p>
              </div>
            </a>
          </div>
        </div>
        <a
          href="#"
          className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium"
        >
          <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
            Recent Expenses
          </h5>
          <p className="text-body">
            Here are the biggest technology acquisitions of 2025 so far, in
            reverse chronological order.
          </p>
        </a>
      </div>
      <div className="bg-neutral-primary-soft w-full mt-2 p-6 border border-default rounded-md shadow-xs">
        <div className="flex gap-4">
          <div className="flex-1 bg-neutral-primary-soft p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium">
            <h3>Monthly Expenses Trend</h3>
          </div>

          <div className="flex-1 bg-neutral-primary-soft p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium">
            <h3>Daily Expenses Trend</h3>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Dashboard;
