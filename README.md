# 💰 Personal Budget Tracker

A modern personal finance management application built with React and Vite that helps users track income, expenses, budgets, and savings goals through an intuitive dashboard and analytics experience.

## Features

### 📊 Dashboard

- View total balance, income, expenses, and savings rate
- Monthly budget overview
- Financial summary cards
- Interactive charts and visualizations
- Savings goal progress tracking

### 💵 Budget Management

- Create monthly budgets
- Add and manage expense categories
- Track income and spending
- Prevent duplicate budgets for the same month
- Edit and update existing budgets

### 🎯 Savings Goals

- Create savings goals
- Set target amounts and deadlines
- Track progress toward goals
- Visual progress indicators
- Goal completion notifications

### 📈 Analytics

- Income and expense trends over time
- Monthly expense breakdown
- Category-based spending analysis
- Financial performance comparisons
- Historical financial insights

### 👤 User Management

- User registration and login
- User-specific data storage
- Personalized dashboards

---

## Built With

- React
- Vite
- JavaScript (ES6+)
- Tailwind CSS
- Recharts
- React Router
- Material UI Icons
- Local Storage

---

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Navigate to the project folder

```bash
cd my-budget-tracker
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

5. Open your browser and visit

```bash
http://localhost:5173
```

---

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── budgetform/
│   ├── allocateSavings/
│   ├── monthPicker/
│   └── ...
├── pages/
│   ├── dashboard/
│   ├── analytics/
│   ├── budget/
│   └── goals/
├── App.jsx
└── main.jsx
```

---

## Data Storage

This application currently uses Local Storage to persist:

- User accounts
- Budgets
- Expense categories
- Savings goals
- User preferences

Data is stored per user to ensure each user only sees their own financial information.

---

## Future Improvements

- Backend integration
- Cloud data storage
- Export reports to PDF
- Budget notifications
- Recurring transactions
- Dark/Light theme support
- Financial forecasting
- Multi-currency support

---

## Author

**Sesethu Luzipo**

Built as a personal finance management project to help users take control of their spending, budgeting, and savings goals.
