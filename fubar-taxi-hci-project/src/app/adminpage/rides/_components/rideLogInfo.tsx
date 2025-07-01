import { useState, useEffect } from 'react';
import { RideWithKey } from "../_lib/api";


type Props = {
  ride: RideWithKey;
  isNew?: boolean; // Optional prop to highlight new rides
};

export default function RideLogs({ ride, isNew = false }: Props) {
  const [showNewIndicator, setShowNewIndicator] = useState(isNew);

  // Hide the "new" indicator after 3 seconds
  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => {
        setShowNewIndicator(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  const pointA = ride.pointA
    ? `${ride.pointA.latitude.toFixed(6)}, ${ride.pointA.longitude.toFixed(6)}`
    : "N/A";

  const pointBFixed = ride.pointB?.toString().split(',');
  const pointB = pointBFixed 
    ? `${Number(pointBFixed[0]).toFixed(6)}, ${Number(pointBFixed[1]).toFixed(6)}` 
    : "N/A";

  return (
    <div className={`bg-white mb-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 relative ${
      showNewIndicator ? 'ring-2 ring-green-400 ring-opacity-50 animate-pulse' : ''
    }`}>
      {/* New Ride Indicator */}
      {showNewIndicator && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
            NEW
          </div>
        </div>
      )}


      <div className="p-6">
        {/* Header with ID and Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {ride.id ? String(ride.id).charAt(0) : "R"}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Ride from #{ride.id || "N/A"}
              </h3>
              <p className="text-sm text-gray-500 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Live Trip Details
              </p> 
            </div>
          </div>
          <div className="text-right">
            <p className="flex justify-center  text-xs text-gray-500 mb-1">Total Fare</p>
            <span className="px-4 py-2 text-lg font-semibold text-blue-600 bg-blue-100 rounded-full">
              {ride.price} KM
            </span>
            
          </div>
        </div>

        {/* Content Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Trip Information */}
          <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Trip Information
            </h4>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <span className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Description</span>
                <span className="font-medium">{ride.description || "No description provided"}</span>
              </div>
            </div>
          </div>

          {/* Time Information */}
          <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors duration-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Trip Duration
            </h4>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <span className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Start Time</span>
                <span className="font-medium flex items-center">
                  <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {ride.startTime || "N/A"}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="block text-xs text-gray-500 uppercase tracking-wide mb-1">End Time</span>
                <span className="font-medium flex items-center">
                  <svg className="w-3 h-3 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {ride.endTime || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-colors duration-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Route Information
            </h4>
            <div className="space-y-2">
              <div className="text-xs text-gray-600 font-mono">
                <span className=" text-xs text-gray-500 uppercase tracking-wide mb-1 font-sans flex items-center">
                  <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  From (Point A)
                </span>
                <span className="font-medium break-all">{pointA}</span>
              </div>
              <div className="text-xs text-gray-600 font-mono">
                <span className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-sans flex items-center">
                  <svg className="w-3 h-3 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  To (Point B)
                </span>
                <span className="font-medium break-all">{pointB}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Additional Info Row */}
        <div className="hidden md:flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ride ID: {ride.id}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Completed
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1"></div>
              Auto-updating
            </span>
          </div>
          <div className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}
