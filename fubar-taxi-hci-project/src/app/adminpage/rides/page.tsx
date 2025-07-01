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

  // Real-time subscription
  useEffect(() => {
    let previousRideIds: Set<string> = new Set();

    const unsubscribe = subscribeToRides(
      (updatedRides) => {
        // Track new rides for highlighting
        const currentRideIds = new Set(updatedRides.map(ride => ride.firebaseKey));
        const newIds = new Set([...currentRideIds].filter(id => !previousRideIds.has(id)));
        
        setNewRideIds(newIds);
        setRides(updatedRides);
        setLoading(false);
        setError(null);
        
        previousRideIds = currentRideIds;

        // Clear new ride indicators after 5 seconds
        if (newIds.size > 0) {
          setTimeout(() => {
            setNewRideIds(new Set());
          }, 5000);
        }
      },
      (error) => {
        setError(error.message);
        setLoading(false);
        console.error("Real-time subscription error:", error);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Filter rides when date range or rides change
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Connecting to live data...</p>
          <div className="mt-2 flex items-center justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-xs text-green-600">Establishing real-time connection</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">⚠️ Connection Error</div>
          <div className="text-gray-600 mb-4">Error: {error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header with Live Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              Ride Management
              <div className="ml-3 flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="ml-1 text-sm font-normal text-green-600">Live</span>
              </div>
            </h1>
            <p className="text-gray-600 mt-1">
              Total: <span className="font-semibold text-blue-600">{rides.length}</span>
              {filteredRides.length !== rides.length && (
                <span className="ml-2">
                  | Filtered: <span className="font-semibold text-orange-600">{filteredRides.length}</span>
                </span>
              )}
              {newRideIds.size > 0 && (
                <span className="ml-4 text-sm text-green-600 animate-pulse">
                  ● {newRideIds.size} New Ride{newRideIds.size > 1 ? 's' : ''}!
                </span>
              )}
            </p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Real-time updates active
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Last update: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

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
        <table className="min-w-full hidden md:table bg-white rounded-md shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ride Details
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRides.length === 0 ? (
              <tr>
                <td className="p-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium text-gray-900 mb-1">No rides found</p>
                    <p className="text-sm text-gray-500">
                      {fromDate || toDate ? 'Try adjusting your date range' : 'Waiting for rides to appear...'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              currentRides.map((ride) => (
                <tr key={ride.firebaseKey}>
                  <td className="p-0">
                    <RideLogs 
                      ride={ride} 
                      isNew={newRideIds.has(ride.firebaseKey)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-1 md:hidden">
          {currentRides.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg font-medium text-gray-900 mb-1">No rides found</p>
                <p className="text-sm text-gray-500">
                  {fromDate || toDate ? 'Try adjusting your date range' : 'Waiting for rides to appear...'}
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs text-green-600">Connected and listening</span>
                </div>
              </div>
            </div>
          ) : (
            currentRides.map((ride) => (
              <RideLogs 
                key={ride.firebaseKey} 
                ride={ride} 
                isNew={newRideIds.has(ride.firebaseKey)}
              />
            ))
          )}
        </div>

        {/* Pagination */}
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
