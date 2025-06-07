"use client";

import { useEffect, useState } from "react";
import { fetchRides, RideWithKey } from "./_lib/api";
import RideLogs from "./_components/rideLogInfo";
import Pagination from "./_components/pagination";
import DateRangePicker from "./_components/dateRangePicker";

const PAGE_SIZE = 10;

export default function RideTable() {
  const [rides, setRides] = useState<RideWithKey[]>([]);
  const [filteredRides, setFilteredRides] = useState<RideWithKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredRides.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentRides = filteredRides.slice(startIndex, startIndex + PAGE_SIZE);

  useEffect(() => {
    const loadRides = async () => {
      const data = await fetchRides();
      setRides(data);
      setFilteredRides(data);
      setLoading(false);
    };
    loadRides();
  }, []);

  useEffect(() => {
    if (!loading) {
      const filtered = rides.filter((ride) => {
        const match = ride.startTime.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        const start = match ? `${match[3]}-${match[2]}-${match[1]}` : "";
        const isAfterFrom = !fromDate || start >= fromDate;
        const isBeforeTo = !toDate || start <= toDate;
        return isAfterFrom && isBeforeTo;
      });
      setFilteredRides(filtered);
      setCurrentPage(1); // reset to first page when filtering
    }
  }, [fromDate, toDate, rides, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#170A2D] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Filters */}
      <DateRangePicker
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
      {/* Table Wrapper */}
      <div className="flex-col overflow-auto h-full rounded-md">
        {/* Desktop Table */}
        <table className="min-w-full hidden md:table bg-white rounded-md">
          <thead>
            <tr className="bg-gray-200 text-left text-sm uppercase text-gray-600 sticky top-0">
              <th className="p-3">Driver ID</th>
              <th className="p-3">Description</th>
              <th className="p-3">Start Time</th>
              <th className="p-3">End Time</th>
              <th className="p-3">Point A</th>
              <th className="p-3">Point B</th>
              <th className="p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {currentRides.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No rides found for selected range.
                </td>
              </tr>
            ) : (
              currentRides.map((ride) => (
                <RideLogs key={ride.firebaseKey} ride={ride} />
              ))
            )}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-1 md:hidden">
          {currentRides.length === 0 ? (
            <div className="text-center text-gray-400 py-4">
              No rides found for selected range.
            </div>
          ) : (
            currentRides.map((ride) => (
              <RideLogs key={ride.firebaseKey} ride={ride} />
            ))
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          pagesCount={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
