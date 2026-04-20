import { useState, useEffect } from "react";
import MonthPicker from "../../components/monthPicker/monthPicker";
import dashbaordLogo from "../../assets/dashboardImg.png";
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
import BudgetForm from "../../components/budgetform/BudgetForm";
import { useNavigate, useNavigation } from "react-router-dom";
import { ArrowOutwardRounded } from "@mui/icons-material";

function Dashboard({ username }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [budgets, setBudgets] = useState([]);
  const [openBudget, setOpenBudget] = useState(false);
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);

  // useEffect(() => {
  //   localStorage.clear();
  // }, []);

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
  const isCurrentMonthEmpty = currentMonthBudgets.length === 0;

  const today = new Date();
  const isPastMonth =
    selectedMonth.getFullYear() < today.getFullYear() ||
    (selectedMonth.getFullYear() === today.getFullYear() &&
      selectedMonth.getMonth() < today.getMonth());

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

  const getLast6MonthsData = () => {
    const data = [];

    for (let i = 5; i >= 0; i--) {
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

  const chartData = getLast6MonthsData();

  const getCategoryData = () => {
    const categoryMap = {};

    currentMonthBudgets.forEach((budget) => {
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
    "#301934",
    "#7F00FF",
    "#800080",
    "#E6E6FA",
    "#FF00FF",
    "#DA70D6",
    "#673147",
    "#AA98A9",
    "#702963",
    "#4B0082",
    "#be93d4",
    "#E0B0FF",
    "#483248 ",
  ];

  return (
    <main className="px-4 pt-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1 pb-6 text-left">
          <h1 className="text-3xl font-bold pt-4 pl-2 text-white">
            Welcome back {username}!
          </h1>
          <p className="text-md text-subText pl-2 pb-4">
            Its time to manage your finances
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
      {!isCurrentMonthEmpty && (
        <div className="flex justify-end">
          <button
            onClick={() => setOpenBudget(true)}
            className="ml-auto p-2 text-white border bg-lilac border-mainText rounded-full shadow-md hover:scale-105 transition"
          >
            + Create Budget
          </button>
        </div>
      )}
      {isCurrentMonthEmpty ? (
        <div className="text-center text-subText mt-10">
          <img src={dashbaordLogo} className="opacity-20 mx-auto block w-180" />

          <p className="pb-4 text-lg font-medium">
            No budget for{" "}
            {selectedMonth.toLocaleString("default", { month: "long" })}
          </p>
          {!isPastMonth && (
            <button
              className="p-3 text-white bg-lilac rounded-full shadow-md hover:scale-105 transition"
              onClick={() => setOpenBudget(true)}
            >
              + Create New Budget
            </button>
          )}
        </div>
      ) : (
        <div>
          <div className="p-6 grid grid-cols-12 gap-6">
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div
                onClick={() => navigate("/budget")}
                className="flex flex-col items-start gap-4 w-full p-5  hover:shadow-xl border bg-sidebarColor border-mainText rounded-xl shadow-md transition"
              >
                <div className="flex justify-between items-center w-full">
                  <h5 className="text-md text-white font-bold">
                    Total Balance
                  </h5>
                  <ArrowOutwardRounded className="text-lilac transition-transform duration-300 hover:scale-125" />
                </div>
                <p className="text-2xl font-extrabold text-white text-header">
                  R {totalBalance}
                </p>
                <span className="text-sm">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full border ${
                      balanceDifference >= 0
                        ? "text-green-600 border-green-600"
                        : "text-red-800 border-red-800"
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
                        stroke={balanceDifference >= 0 ? "#be93d4" : "#b65fcf"}
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div
                onClick={() => navigate("/budget")}
                className="flex flex-col items-start gap-4 w-full p-5  hover:shadow-xl border bg-sidebarColor border-mainText rounded-xl shadow-md transition"
              >
                <div className="flex justify-between items-center w-full">
                  <h5 className="text-md text-white font-bold">
                    Monthly Income
                  </h5>
                  <ArrowOutwardRounded className="text-lilac transition-transform duration-300 hover:scale-125" />
                </div>
                <p className="text-2xl font-extrabold text-white">
                  R {totalIncome}
                </p>
                <span className="text-sm">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full border ${
                      incomeDifference >= 0
                        ? "text-green-600 border-green-600"
                        : "text-red-800 border-red-800"
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
                        stroke={incomeDifference >= 0 ? "#be93d4" : "#b65fcf"}
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div
                onClick={() => navigate("/budget")}
                className="flex flex-col items-start gap-4 w-full p-5  hover:shadow-xl border bg-sidebarColor border-mainText rounded-xl shadow-md transition"
              >
                <div className="flex justify-between items-center w-full">
                  <h5 className="text-md text-white font-bold">
                    Monthly Expenses
                  </h5>
                  <ArrowOutwardRounded className="text-lilac transition-transform duration-300 hover:scale-125" />
                </div>
                <p className="text-2xl font-extrabold text-white">
                  R {totalExpenses}
                </p>
                <span className="text-sm">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full border ${
                      expensesDifference >= 0
                        ? "text-green-600 border-green-600"
                        : "text-red-800 border-red-800"
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
                        stroke={expensesDifference >= 0 ? "#be93d4" : "#b65fcf"}
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div
                onClick={() => navigate("/budget")}
                className="flex flex-col items-start gap-4 w-full p-5  hover:shadow-xl border bg-sidebarColor border-mainText rounded-xl shadow-md transition"
              >
                <div className="flex justify-between items-center w-full">
                  <h5 className="text-md text-white font-bold">Saving Rate</h5>
                  <ArrowOutwardRounded className="text-lilac transition-transform duration-300 hover:scale-125" />
                </div>
                <p className="text-2xl font-extrabold text-white">
                  {savingsRate}%
                </p>
                <span className="text-sm">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full border ${
                      savingsRateDifference >= 0
                        ? "text-green-600 border-green-600"
                        : "text-red-800 border-red-800"
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
                          savingsRateDifference >= 0 ? "#be93d4" : "#b65fcf"
                        }
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="bg-neutral-primary-soft w-full mt-2 p-6 ">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-sidebarColor p-6 border border-default rounded-md shadow-xs">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h5 className="text-md text-white font-bold">
                      Discretionary income{" "}
                    </h5>
                    <p className=" text-md font-bold text-subText">
                      Last 6 months
                    </p>
                  </div>
                </div>

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barGap={6} barCategoryGap="20%">
                      <CartesianGrid stroke="#2a2a2a" vertical={false} />

                      <XAxis
                        dataKey="month"
                        tickFormatter={(m) =>
                          new Date(m + "-01").toLocaleString("default", {
                            month: "short",
                          })
                        }
                        tick={{ fill: "#aaa", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        tick={{ fill: "#aaa", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip
                        formatter={(value) => `R ${value}`}
                        contentStyle={{
                          backgroundColor: "#1f1f1f",
                          border: "none",
                          borderRadius: "8px",
                        }}
                      />

                      <Bar
                        dataKey="income"
                        fill="#5b6cff"
                        radius={[8, 8, 0, 0]}
                      />

                      <Bar
                        dataKey="expenses"
                        fill="#d16ba5"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex-1 bg-sidebarColor p-6 border border-default rounded-md shadow-xs ">
                <h5 className="text-md text-white font-bold">
                  Monthly Expenses Breakdown
                </h5>

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

          <div className="bg-neutral-primary-soft w-full mt-2 p-6">
            <div className="bg-sidebarColor p-6 border border-default rounded-md shadow-xs">
              <h5 className="text-md text-white font-bold">Saving Goals</h5>

              {goals.length === 0 ? (
                <p className="text-subText text-sm">
                  No goals yet. Start saving 🚀
                </p>
              ) : (
                <div className="space-y-4">
                  {goals.map((goal) => {
                    const progress =
                      (Number(goal.saved) / Number(goal.target)) * 100;

                    const percentage = Math.min(Math.round(progress), 100);

                    return (
                      <div key={goal.id} className="p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-subText font-semibold">
                            {goal.name}
                          </h3>

                          <span className="text-sm text-subText">
                            R{goal.saved} / R{goal.target}
                          </span>
                        </div>

                        <div className="w-full bg-neutral-700 rounded-full h-5 relative overflow-hidden">
                          <div
                            className={`h-full rounded-full flex items-center px-2 ${
                              percentage >= 100
                                ? "bg-green-500"
                                : "bg-purpleshade"
                            }`}
                            style={{ width: `${percentage}%` }}
                          >
                            {percentage > 10 && (
                              <span className="text-xs text-white font-medium">
                                {percentage}%
                              </span>
                            )}
                          </div>
                        </div>

                        {percentage >= 100 && (
                          <p className="text-green-400 text-xs mt-1">
                            Goal reached 🎉
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
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
export default Dashboard;
