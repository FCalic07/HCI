"use client";

import { useEffect, useState } from "react";
import { subscribeToRides, RideWithKey } from "./_lib/api";
import RideLogs from "./_components/rideLogInfo";
import Pagination from "./_components/pagination";
import DateRangePicker from "./_components/dateRangePicker";

const PAGE_SIZE = 10;

export default function RideTable() {
  const [rides, setRides] = useState<RideWithKey[]>([]);
  const [filteredRides, setFilteredRides] = useState<RideWithKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newRideIds, setNewRideIds] = useState<Set<string>>(new Set());

  const totalPages = Math.ceil(filteredRides.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentRides = filteredRides.slice(startIndex, startIndex + PAGE_SIZE);

  useEffect(() => {
    const lastSeenRide = localStorage.getItem("lastShownRide");

    const unsubscribe = subscribeToRides(
      (updatedRides) => {
        const currentRideIds = new Set(updatedRides.map((r) => r.firebaseKey));
        const newIds = new Set<string>();

        // Determine the index of lastSeenRide
        const lastSeenIndex = updatedRides.findIndex(r => r.firebaseKey === lastSeenRide);

        // Everything before that is newer
        const actuallyNew = updatedRides.slice(0, lastSeenIndex === -1 ? updatedRides.length : lastSeenIndex);
        for (const ride of actuallyNew) {
          newIds.add(ride.firebaseKey);
        }

        // Update state
        setNewRideIds(newIds);
        setRides(updatedRides);
        setLoading(false);
        setError(null);

        // Update localStorage after a delay (e.g. to allow user to see "NEW" highlight)
        if (updatedRides.length > 0) {
          setTimeout(() => {
            localStorage.setItem("lastShownRide", updatedRides[0].firebaseKey);
          }, 5000); // wait 5s before updating the lastSeenRide
        }
      },
      (error) => {
        setError(error.message);
        setLoading(false);
        console.error("Real-time subscription error:", error);
      }
    );

    return () => unsubscribe();
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
      setCurrentPage(1);
    }
  }, [fromDate, toDate, rides, loading]);

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-600">
        Error loading rides: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Ride Management</h1>
        {newRideIds.size > 0 && (
          <span className="text-sm text-green-600 animate-pulse">
            ● {newRideIds.size} New Ride{newRideIds.size > 1 ? 's' : ''}!
          </span>
        )}
      </div>

      <DateRangePicker
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />

      <div className="mt-4">
        <table className="min-w-full hidden md:table bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Ride Details</th>
            </tr>
          </thead>
          <tbody>
            {currentRides.map((ride) => (
              <tr key={ride.firebaseKey}>
                <td className="p-0">
                  <RideLogs ride={ride} isNew={newRideIds.has(ride.firebaseKey)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="md:hidden space-y-2">
          {currentRides.map((ride) => (
            <RideLogs
              key={ride.firebaseKey}
              ride={ride}
              isNew={newRideIds.has(ride.firebaseKey)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            pagesCount={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
}
