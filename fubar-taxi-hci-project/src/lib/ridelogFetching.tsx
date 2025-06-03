import { ref, get } from "firebase/database";
import { db } from "@/app/firebase/config";

export const fetchRides = async () => {
  const reportRef = ref(db, "GellaTaxi/report");
  const snapshot = await get(reportRef);

  if (snapshot.exists()) {
    const data = snapshot.val();
    const rideArray = Object.entries(data).map(([id, value]: [string, any]) => ({
      id,
      ...value,
    }));

    return rideArray;
  }

  return [];
};
