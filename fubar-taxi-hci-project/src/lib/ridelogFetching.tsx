import { ref, get } from "firebase/database";
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
  // add more fields as needed based on your data
};


export type RideWithKey = Ride & { firebaseKey: string };

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

    return rideArray;
  }

  return [];
};
