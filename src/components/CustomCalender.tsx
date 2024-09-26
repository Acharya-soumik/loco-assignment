"use client";
const WeekDaysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
import React from "react";
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
  isSameDay,
} from "date-fns";

type Event = {
  id: string;
  date: Date;
  title: string;
  description: string;
};

const CustomCalendar = ({
  selectedDate,
  setSelectedDate,
  currentMonth,
  setCurrentMonth,
  events,
}: {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  events: Event[];
}) => {
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

  const hasEvent = (day: Date) => {
    return events.some((event) => isSameDay(event.date, day));
  };

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
          <h2 key={day} className="text-center font-medium text-gray-500">
            {day}
          </h2>
        ))}
        {calendarDays.map((day, index) => {
          const isDisabled = isBefore(day, new Date()) && !isToday(day);
          const isSelected = selectedDate && isSameDay(selectedDate, day);
          const dayHasEvent = hasEvent(day);
          return (
            <div
              onClick={() => !isDisabled && setSelectedDate(day)}
              key={index}
              className={`h-10 flex flex-col items-center justify-center border border-gray-200 rounded-md relative ${
                !isSameMonth(day, currentMonth) || isDisabled
                  ? "text-gray-300"
                  : isSelected
                  ? "bg-red-200 text-white"
                  : "text-gray-500 hover:shadow-md hover:border-red-100"
              }`}
            >
              {format(day, "d")}
              {dayHasEvent && (
                <div className="absolute bottom-1 w-1 h-1 bg-red-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
