"use client";

import { useEffect, useState } from "react";
import { fetchRides, RideWithKey } from "@/lib/ridelogFetching";
import RideLogs from "@/components/RideLogs";

export default function RideTable() {
  const [rides, setRides] = useState<RideWithKey[]>([]);
  const [filteredRides, setFilteredRides] = useState<RideWithKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
    }
  }, [fromDate, toDate, rides]);

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
      <div className="mb-4 flex gap-4 flex-wrap">
        <label className="text-black">
          From:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="text-black ml-2 px-2 py-1 rounded"
          />
        </label>
        <label className="text-black">
          To:
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="text-black ml-2 px-2 py-1 rounded"
          />
        </label>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-y-auto flex-1 rounded-md">
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
            {filteredRides.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No rides found for selected range.
                </td>
              </tr>
            ) : (
              filteredRides.map((ride) => (
                <RideLogs key={ride.firebaseKey} ride={ride} />
              ))
            )}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-1 md:hidden">
          {filteredRides.length === 0 ? (
            <div className="text-center text-gray-400 py-4">
              No rides found for selected range.
            </div>
          ) : (
            filteredRides.map((ride) => (
              <RideLogs key={ride.firebaseKey} ride={ride} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
