import { useState } from "react";
import DatePicker from "react-datepicker";

function MonthPicker({ selectedMonth, setSelectedMonth }) {
  return (
    <div className="relative">
      <DatePicker
        selected={selectedMonth}
        onChange={(date) => setSelectedMonth(date)}
        dateFormat="yyyy-MM"
        showMonthYearPicker
        customInput={
          <button className="px-4 py-2 bg-highlighter text-white rounded-full shadow-md hover:scale-105 transition">
            {" "}
            {selectedMonth.toLocaleString("default", {
              month: "short",
              year: "numeric",
            })}
          </button>
        }
      />
    </div>
  );
}

export default MonthPicker;
