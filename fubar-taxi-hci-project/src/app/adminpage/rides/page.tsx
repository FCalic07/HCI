"use client";

import { useEffect, useState } from "react";
import { fetchRides } from "@/lib/ridelogFetching";

export default function RideTable() {
  const [rides, setRides] = useState<any[]>([]);
  const [filteredRides, setFilteredRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const loadRides = async () => {
      const data = await fetchRides();
      setRides(data);
      setFilteredRides(data); // initially show all
      setLoading(false);
    };

    loadRides();
  }, []);

  useEffect(() => {
    if (!loading) {
      const filteredRides = rides.filter((ride) => {
        const match = ride.startTime.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        const start = match ? `${match[3]}-${match[2]}-${match[1]}` : "";

        const isAfterFrom = !fromDate || start >= fromDate;
        const isBeforeTo = !toDate || start <= toDate;

        return isAfterFrom && isBeforeTo;
      });

      setFilteredRides(filteredRides);
    }
  }, [fromDate, toDate, rides]);

  if (loading) return <div className="text-white">Loading rides...</div>;

  return (
    <div className="h-screen flex flex-col text-white p-4 bg-[#170A2D]">
      {/* Filters */}
      <div className="mb-4 flex gap-4 items-center">
        <label>
          From:{" "}
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="text-black px-2 py-1 rounded"
          />
        </label>
        <label>
          To:{" "}
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="text-black px-2 py-1 rounded"
          />
        </label>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-y-auto flex-1 rounded border border-gray-700">
        <table className="min-w-full bg-[#1e1e2f]">
          <thead>
            <tr className="bg-[#2c2c3e] text-left text-sm uppercase text-gray-400 sticky top-0">
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
            {filteredRides.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-400">
                  No rides found for selected range.
                </td>
              </tr>
            )}
            {filteredRides.map((ride) => (
              <tr
                className="border-b border-gray-700 hover:bg-[#33334d]"
                key={ride.firebaseKey}
              >
                <td className="p-3">{ride.id || "N/A"}</td>
                <td className="p-3">{ride.description || "N/A"}</td>
                <td className="p-3">{ride.startTime || "N/A"}</td>
                <td className="p-3">{ride.endTime || "N/A"}</td>
                <td className="p-3">
                  {ride.pointA
                    ? `${ride.pointA.latitude}, ${ride.pointA.longitude}`
                    : "N/A"}
                </td>
                <td className="p-3">
                  {ride.pointB
                    ? `${ride.pointB.latitude}, ${ride.pointB.longitude}`
                    : "N/A"}
                </td>
                <td className="p-3">{ride.price + "€" || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
