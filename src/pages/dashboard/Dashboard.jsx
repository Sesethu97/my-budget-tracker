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

  const lastMonthDate = new Date();
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  const lastMonth = lastMonthDate.toISOString().slice(0, 7);

  const lastMonthBudgets = budgets.filter(
    (budget) => budget.month === lastMonth,
  );

  const lastMonthIncome = lastMonthBudgets.reduce(
    (sum, budget) => sum + Number(budget.income),
    0,
  );

  const lastMonthExpenses = lastMonthBudgets.reduce((sum, budget) => {
    const expensesTotal = budget.expenses.reduce(
      (expSum, exp) => expSum + Number(exp.amount),
      0,
    );
    return sum + expensesTotal;
  }, 0);

  const lastMonthTotalIncome = lastMonthBudgets.reduce(
    (sum, budget) => sum + Number(budget.income),
    0,
  );

  const lastMonthTotalSavings = lastMonthBudgets.reduce(
    (sum, budget) => sum + Number(budget.savings),
    0,
  );

  const lastMonthSavingsRate =
    lastMonthTotalIncome > 0
      ? ((lastMonthTotalSavings / lastMonthTotalIncome) * 100).toFixed(1)
      : 0;

  const lastMonthBalance = lastMonthIncome - lastMonthExpenses;
  const balanceDifference = totalBalance - lastMonthBalance;

  const incomeDifference = totalIncome - lastMonthIncome;

  const expensesDifference = totalExpenses - lastMonthExpenses;
  const savingsRateDifference = (savingsRate - lastMonthSavingsRate).toFixed(1);

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
      <div className="px-10 pt-4">
        <div className="grid grid-cols-4 gap-4 pb-6">
          <a className="flex flex-col items-start gap-4 w-full  p-5 border border-textSecondary rounded-xl shadow-md hover:shadow-lg transition bg-highlighter/1">
            {" "}
            <div className="w-10 h-10 flex items-center justify-center rounded-full">
              <svg
                className="w-10 h-10 opacity-50 text-highlighter"
                viewBox="0 0 199.865 199.865"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M67.668,7.731c-1.002-1.537-1.083-3.5-0.208-5.113C68.333,1.005,70.021,0,71.856,0h56.153c1.835,0,3.522,1.005,4.396,2.618
  c0.874,1.614,0.794,3.576-0.208,5.113L125.3,18.308c-2.883,4.721-6.018,12.657-6.891,19.467h-7.943l2.071-4.472
  c1.161-2.506,0.07-5.478-2.436-6.638c-2.506-1.161-5.479-0.069-6.638,2.436l-3.276,7.075l-4.864-12.961
  c-0.97-2.585-3.852-3.895-6.438-2.924c-2.585,0.97-3.895,3.853-2.924,6.438l4.146,11.046h-9.448
  c-1.353-10.379-8.054-22.33-8.732-23.516L67.668,7.731z M80.201,111.821c0,5.398,4.387,9.785,9.779,9.785h4.952v-19.564H89.98
  C84.588,102.042,80.201,106.429,80.201,111.821z M104.932,151.171h4.949c5.394,0,9.782-4.389,9.782-9.783s-4.388-9.782-9.782-9.782
  h-4.949V151.171z M170.49,140.626c0,35.986-27.695,59.238-70.558,59.238s-70.558-23.252-70.558-59.238
  c0-27.145,16.112-68.644,42.142-88.358c0.062-0.047,0.125-0.092,0.189-0.136c1.31-0.908,3.188-2.491,4.903-4.357H89.51l-2.838,6.128
  c-1.161,2.506-0.07,5.478,2.436,6.638c0.68,0.315,1.395,0.464,2.098,0.464c1.888,0,3.695-1.074,4.541-2.9l4.043-8.731l4.864,12.961
  c0.753,2.007,2.658,3.245,4.682,3.245c0.583,0,1.177-0.103,1.756-0.32c2.585-0.97,3.895-3.853,2.924-6.438l-4.146-11.047h12.465
  c0.641,0.63,1.316,1.205,1.999,1.694C151.949,67.175,170.49,110.868,170.49,140.626z M104.932,121.606v-19.564h19.731
  c2.761,0,5-2.239,5-5s-2.239-5-5-5h-19.731v-3.601c0-2.761-2.239-5-5-5s-5,2.239-5,5v3.601H89.98
  c-10.906,0-19.779,8.873-19.779,19.785c0,10.906,8.873,19.779,19.779,19.779h4.952v19.565H75.201c-2.761,0-5,2.239-5,5s2.239,5,5,5
  h19.731v5.197c0,2.761,2.239,5,5,5s5-2.239,5-5v-5.197h4.949c10.908,0,19.782-8.875,19.782-19.783
  c0-10.908-8.874-19.782-19.782-19.782H104.932z"
                />
              </svg>
            </div>
            <h5 className="text-md  text-textSecondary font-bold">
              Total Balance
            </h5>
            <p className="text-xl font-semibold text-textPyrimar">
              R {totalBalance}
            </p>
            <span
              className={`text-sm ${
                balanceDifference >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {balanceDifference >= 0 ? "↑" : "↓"} R{" "}
              {Math.abs(balanceDifference)} vs last month
            </span>{" "}
          </a>
          <a className="flex flex-col items-start gap-4 w-full  p-5 border border-textSecondary rounded-xl shadow-md hover:shadow-lg transition bg-highlighter/1">
            {" "}
            <div className="w-10 h-10 flex items-center justify-center rounded-full ">
              <svg
                className="w-10 h-10 text-highlighter"
                viewBox="0 0 1024 1024"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M299.553 479.395h208.364c104.234-114.357-104.128-228.715 0-343.040h-208.364c-104.267 114.325 104.234 228.682 0 343.040zM326.701 307.929c-21.039-42.592 5.698-77.053 49.077-77.053 41.769 0 83.984 34.46 105.092 77.053 21.039 42.559-5.698 77.017-49.045 77.017-41.872-0.033-84.053-34.528-105.125-77.017z..."
                  fillOpacity="0.5"
                />
              </svg>
            </div>
            <h5 className="text-md  text-textSecondary font-bold">
              Monthly Income
            </h5>
            <p className="text-xl font-semibold text-textPyrimar">
              R {totalIncome}
            </p>
            <span
              className={`text-sm ${
                incomeDifference >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {incomeDifference >= 0 ? "↑" : "↓"} R {Math.abs(incomeDifference)}{" "}
              vs last month
            </span>
          </a>
          <a className="flex flex-col items-start gap-4 w-full  p-5 border border-textSecondary rounded-xl shadow-md hover:shadow-lg transition bg-highlighter/1">
            {" "}
            <div className="w-10 h-10 flex items-center justify-center rounded-full ">
              <svg
                className="w-10 h-10 text-highlighter"
                viewBox="0 0 1024 1024"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M299.553 479.395h208.364c104.234-114.357-104.128-228.715 0-343.040h-208.364c-104.267 114.325 104.234 228.682 0 343.040zM326.701 307.929c-21.039-42.592 5.698-77.053 49.077-77.053 41.769 0 83.984 34.46 105.092 77.053 21.039 42.559-5.698 77.017-49.045 77.017-41.872-0.033-84.053-34.528-105.125-77.017z..."
                  fillOpacity="0.5"
                />
              </svg>
            </div>
            <h5 className="text-md  text-textSecondary font-bold">
              Monthly Expenses
            </h5>
            <p className="text-xl font-semibold text-textPyrimar">
              R {totalIncome}
            </p>
            <span
              className={`text-sm ${
                expensesDifference >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {expensesDifference >= 0 ? "↑" : "↓"} R{" "}
              {Math.abs(expensesDifference)} vs last month
            </span>
          </a>
          <a className="flex flex-col items-start gap-4 w-full p-5 border border-textSecondary rounded-xl shadow-md hover:shadow-lg transition bg-highlighter/1">
            <div className="w-10 h-10 flex items-center justify-center rounded-full">
              <svg
                className="w-10 h-10 text-highlighter"
                viewBox="0 0 1024 1024"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="..." fillOpacity="0.5" />
              </svg>
            </div>
            <h5 className="text-md text-textSecondary font-bold">
              Saving Rate
            </h5>
            <p className="text-xl font-semibold text-textPyrimar">
              {savingsRate}%
            </p>
            <span
              className={`text-sm ${
                savingsRateDifference >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {savingsRateDifference >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(savingsRateDifference)}% vs last month
            </span>
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
      </div>
    </main>
  );
}
export default Dashboard;
