// components/DateRangePicker.tsx
"use client";

import React from "react";

type DateRangePickerProps = {
  fromDate: string;
  toDate: string;
  setFromDate: (date: string) => void;
  setToDate: (date: string) => void;
};

export default function DateRangePicker({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}: DateRangePickerProps) {
  return (
    <div className="mb-6 flex gap-6 flex-wrap">
      {/* From Date Picker */}
      <div className="flex flex-col">
        <label
          className="text-sm text-gray-700 font-medium mb-1"
          htmlFor="fromDate"
        >
          From
        </label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-300 transition duration-200"
        />
      </div>

      {/* To Date Picker */}
      <div className="flex flex-col">
        <label
          className="text-sm text-gray-700 font-medium mb-1"
          htmlFor="toDate"
        >
          To
        </label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-300 transition duration-200"
        />
      </div>
    </div>
  );
}
