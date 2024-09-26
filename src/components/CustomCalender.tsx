"use client";
const WeekDaysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  startOfWeek,
  endOfWeek,
  isBefore,
  isToday,
} from "date-fns";

const CustomCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
        <button
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <ChevronLeft color="gray" className="opacity-50" size={24} />
        </button>
        <h2 className="text-lg font-semibold text-red-300">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <ChevronRight className="opacity-50" color="gray" size={24} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 p-2">
        {WeekDaysArr.map((day) => (
          <div key={day} className="text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => {
          const isDisabled = isBefore(day, new Date()) && !isToday(day);
          return (
            <div
              key={index}
              className={`h-10 flex items-center justify-center border border-gray-200 ${
                !isSameMonth(day, currentMonth) || isDisabled
                  ? "text-gray-300"
                  : "text-gray-500 hover:shadow-md hover:border-red-100"
              }`}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
