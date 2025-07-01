import { ref, onValue, DataSnapshot,get } from "firebase/database";
import { db } from "@/app/firebase/config";

type Ride = {
  id: number;
  description: string;
  startTime: string;
  endTime: string;
  pointA: {
    latitude: number;
    longitude: number;
  };
  pointB?: string | {
    latitude: number;
    longitude: number;
  };
  price: string;
};

export type RideWithKey = Ride & { firebaseKey: string };

// One-time fetch (your current function)
export const fetchRides = async (): Promise<RideWithKey[]> => {
  const reportRef = ref(db, "GellaTaxi/report");
  const snapshot = await get(reportRef);

  if (snapshot.exists()) {
    const data: Record<string, Ride> = snapshot.val();
    const rideArray = Object.entries(data).map(
      ([firebaseKey, rideData]): RideWithKey => ({
        firebaseKey,
        ...rideData,
      })
    );
    return rideArray.slice().reverse();
  }
  return [];
};

// Real-time listener function
export const subscribeToRides = (
  callback: (rides: RideWithKey[]) => void,
  onError?: (error: Error) => void
): (() => void) => {
  const reportRef = ref(db, "GellaTaxi/report");
  
  const unsubscribe = onValue(
    reportRef,
    (snapshot: DataSnapshot) => {
      if (snapshot.exists()) {
        const data: Record<string, Ride> = snapshot.val();
        const rideArray = Object.entries(data).map(
          ([firebaseKey, rideData]): RideWithKey => ({
            firebaseKey,
            ...rideData,
          })
        );
        callback(rideArray.slice().reverse());
      } else {
        callback([]);
      }
    },
    (error) => {
      console.error("Firebase subscription error:", error);
      onError?.(error);
    }
  );

  // Return unsubscribe function
  return unsubscribe;
};
