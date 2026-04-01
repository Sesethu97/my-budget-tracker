import { useState, useEffect } from "react";
import MonthPicker from "../../components/monthPicker/monthPicker";
import analyticsLogo from "../../assets/analyticsLogo.png";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

function AnalyticDashboard() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [budgets, setBudgets] = useState([]);
  const [openBudget, setOpenBudget] = useState(false);

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    const savedBudgets = localStorage.getItem("budgets");

    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }
  }, []);

  const currentMonth = selectedMonth.toISOString().slice(0, 7);
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

  const getLast12MonthsData = () => {
    const data = [];

    for (let i = 11; i >= 0; i--) {
      // 12 months instead of 6
      const d = new Date(selectedMonth);
      d.setMonth(d.getMonth() - i);

      const monthKey = d.toISOString().slice(0, 7);

      const monthBudgets = budgets.filter((b) => b.month === monthKey);

      const income = monthBudgets.reduce((sum, b) => sum + Number(b.income), 0);

      const expenses = monthBudgets.reduce((sum, b) => {
        const total = b.expenses.reduce(
          (expSum, exp) => expSum + Number(exp.amount),
          0,
        );
        return sum + total;
      }, 0);

      data.push({
        month: monthKey,
        income,
        expenses,
      });
    }

    return data;
  };

  const chartData = getLast12MonthsData();

  const getCategoryData = () => {
    const categoryMap = {};

    budgets.forEach((budget) => {
      budget.expenses.forEach((exp) => {
        const cat = exp.category;

        if (!categoryMap[cat]) {
          categoryMap[cat] = 0;
        }

        categoryMap[cat] += Number(exp.amount);
      });
    });

    return Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));
  };

  const pieData = getCategoryData();

  const COLORS = [
    "#1a182e",
    "#8b008b",
    "#c3b1e1",
    "#010007",
    "#0d031b",
    "#444349",
  ];

  return (
    <main className="px-4 pt-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1 pb-6 text-left">
          <h1 className="text-3xl font-bold pt-4 pl-2 text-white">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-subText pl-2 pb-4">
            Detailed overview of your financial status
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="pt-2 p-2 bg-sidebarColor text-white border border-subText rounded-full shadow-md hover:scale-105 transition">
            📅
          </span>
          <MonthPicker
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </div>
      </div>
      {budgets.length === 0 ? (
        <div className="text-center text-subText">
          <img src={analyticsLogo} className="opacity-20 mx-auto block w-200" />

          <p className="pb-4">You haven't created any budgets yet</p>
          <div className="pb-6">
            <button
              className="p-2  text-white border bg-sidebarHighlight border-sidebarHighlight rounded-full shadow-md "
              onClick={() => setOpenBudget(true)}
            >
              + Create Budget
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="p-6 grid grid-cols-12 gap-6">
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <a className="flex flex-col items-start gap-4 w-full p-5  hover:shadow-xl border bg-sidebarColor border-subText rounded-xl shadow-md transition">
                <h5 className="text-md text-subText font-bold">
                  Total Balance
                </h5>
                <p className="text-2xl font-extrabold text-subText text-header">
                  R {totalBalance}
                </p>
                <span className="text-sm">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full border ${
                      balanceDifference >= 0
                        ? "text-[#c3b1e1] border-[#c3b1e1]"
                        : "text-[#7160d6] border-[#7160d6]"
                    }`}
                  >
                    {balanceDifference >= 0 ? "↑" : "↓"} R{" "}
                    {Math.abs(balanceDifference)}
                  </span>
                  <span className="ml-1 text-subText">vs last month</span>
                </span>
                <div className="w-full h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <Area
                        type="monotone"
                        dataKey="balance"
                        stroke={balanceDifference >= 0 ? "#c3b1e1" : "#8b008b"}
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </a>
              <a className="flex flex-col items-start gap-4 w-full p-5  hover:shadow-xl border bg-sidebarColor border-subText rounded-xl shadow-md transition">
                <h5 className="text-md text-subText font-bold">
                  Monthly Income
                </h5>
                <p className="text-2xl font-extrabold text-subText">
                  R {totalIncome}
                </p>
                <span className="text-sm">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full border ${
                      incomeDifference >= 0
                        ? "text-[#c3b1e1] border-[#c3b1e1]"
                        : "text-[#7160d6] border-[#7160d6]"
                    }`}
                  >
                    {incomeDifference >= 0 ? "↑" : "↓"} R{" "}
                    {Math.abs(incomeDifference)}
                  </span>
                  <span className="ml-1 text-subText">vs last month</span>
                </span>
                <div className="w-full h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke={incomeDifference >= 0 ? "#c3b1e1" : "#8b008b"}
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </a>
              <a className="flex flex-col items-start gap-4 w-full p-5  hover:shadow-xl border bg-sidebarColor border-subText rounded-xl shadow-md transition">
                <h5 className="text-md text-subText font-bold">
                  Monthly Expenses
                </h5>
                <p className="text-2xl font-extrabold text-subText">
                  R {totalExpenses}
                </p>
                <span className="text-sm">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full border ${
                      expensesDifference >= 0
                        ? "text-[#c3b1e1] border-[#c3b1e1]"
                        : "text-[#7160d6] border-[#7160d6]"
                    }`}
                  >
                    {expensesDifference >= 0 ? "↑" : "↓"} R{" "}
                    {Math.abs(expensesDifference)}
                  </span>
                  <span className="ml-1 text-subText">vs last month</span>
                </span>
                <div className="w-full h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke={expensesDifference >= 0 ? "#c3b1e1" : "#8b008b"}
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </a>
              <a className="flex flex-col items-start gap-4 w-full p-5  hover:shadow-xl border bg-sidebarColor border-subText rounded-xl shadow-md transition">
                <h5 className="text-md text-subText font-bold">Saving Rate</h5>
                <p className="text-2xl font-extrabold text-subText">
                  {savingsRate}%
                </p>
                <span className="text-sm">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full border ${
                      savingsRateDifference >= 0
                        ? "text-[#c3b1e1] border-[#c3b1e1]"
                        : "text-[#7160d6] border-[#7160d6]"
                    }`}
                  >
                    {savingsRateDifference >= 0 ? "↑" : "↓"}{" "}
                    {Math.abs(savingsRateDifference)}%
                  </span>

                  <span className="ml-1 text-subText">vs last month</span>
                </span>

                <div className="w-full h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData.map((d) => ({
                        ...d,
                        savingsRate:
                          d.income > 0
                            ? ((d.income - d.expenses) / d.income) * 100
                            : 0,
                      }))}
                    >
                      <Area
                        type="monotone"
                        dataKey="savingsRate"
                        stroke={
                          savingsRateDifference >= 0 ? "#c3b1e1" : "#8b008b"
                        }
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </a>{" "}
            </div>
          </div>
          <div className="bg-neutral-primary-soft w-full mt-2 p-6 ">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-4">
                <div className="bg-sidebarColor p-6 border border-default rounded-md shadow-xs">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h5 className="text-2xl font-bold text-subText text-heading">
                        R {totalIncome}
                      </h5>
                      <p className="text-subText text-sm">
                        Monthly Income (Last 6 Months)
                      </p>
                    </div>
                    <div
                      className={`flex items-center px-2.5 py-0.5 font-medium text-center ${
                        incomeDifference >= 0
                          ? "text-white bg-sidebarHighlight/10 rounded"
                          : "text-white bg-sidebarHighlight/10 rounded"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 mr-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {incomeDifference >= 0 ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v13m0-13 4 4m-4-4-4 4"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 18V5m0 13-4-4m4 4 4-4"
                          />
                        )}
                      </svg>
                      {Math.abs(incomeDifference)}%
                    </div>
                  </div>

                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient
                            id="incomeColor"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#8370fe"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8370fe"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="expenseColor"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#beb6fa"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="95%"
                              stopColor="#beb6fa"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          tickFormatter={(m) =>
                            new Date(m + "-01").toLocaleString("default", {
                              month: "short",
                            })
                          }
                        />
                        <YAxis />
                        <Tooltip formatter={(value) => `R ${value}`} />

                        <Area
                          type="monotone"
                          dataKey="income"
                          stroke="#8b008b"
                          fill="url(#incomeColor)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="expenses"
                          stroke="#c3b1e1"
                          fill="url(#expenseColor)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-sidebarColor p-6 border border-default rounded-md shadow-xs">
                  <h5 className="text-md text-subText font-bold mb-4">
                    Income vs Expenses (Last 12 Months)
                  </h5>

                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={chartData} // use the last 12 months data we already generated
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="month"
                        tickFormatter={(m) =>
                          new Date(m + "-01").toLocaleString("default", {
                            month: "short",
                          })
                        }
                      />
                      <YAxis />
                      <Tooltip formatter={(value) => `R ${value}`} />
                      <Legend />
                      <Bar dataKey="income" stackId="a" fill="#8b008b" />
                      <Bar dataKey="expenses" stackId="a" fill="#c3b1e1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex-1 bg-sidebarColor p-6 border border-default rounded-md shadow-xs ">
                <h3 className="text-subText mb-4"> Expenses Breakdown</h3>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={100}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip formatter={(value) => `R ${value}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
      {openBudget && (
        <div className="fixed inset-0 flex items-center justify-center bg-backgroundColor/5 backdrop-blur-xs z-50">
          <BudgetForm
            closeModal={() => {
              setOpenBudget(false);
            }}
            setBudgets={setBudgets}
          />
        </div>
      )}
    </main>
  );
}
export default AnalyticDashboard;
