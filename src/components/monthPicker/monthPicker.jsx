import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MonthPicker({ selectedMonth, setSelectedMonth }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-sidebarColor text-white border border-subText rounded-full shadow-md hover:scale-105 transition"
      >
        {selectedMonth.toLocaleString("default", {
          month: "short",
          year: "numeric",
        })}
      </button>

      {open && (
        <div className="absolute mt-2 z-50 w-2xl  bg-white rounded-xl shadow-lg p-2">
          <DatePicker
            selected={selectedMonth}
            onChange={(date) => {
              setSelectedMonth(date);
              setOpen(false);
            }}
            showMonthYearPicker
            inline
          />
        </div>
      )}
    </div>
  );
}

export default MonthPicker;
