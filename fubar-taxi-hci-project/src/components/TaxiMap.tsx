"use client";

import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase/config";
import { ref, onValue } from "firebase/database";

const center = {
  lat: 43.5081, // Split
  lng: 16.4402,
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface Taxi {
  id: string;
  lat: number;
  lng: number;
}

export default function TaxiMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const [taxis, setTaxis] = useState<Taxi[]>([]);

  interface FirebaseTaxiData {
    coords: {
      latitude: number;
      longitude: number;
  };
}

  useEffect(() => {
    const taxiRef = ref(db, "GellaTaxi/Taxi");

    const unsubscribe = onValue(taxiRef, (snapshot) => {
      const data = snapshot.val();
      const parsedTaxis: Taxi[] = [];

      if (data) {
        Object.entries(data).forEach(([id, value]) => {
          const taxi = value as FirebaseTaxiData;

          if (taxi.coords?.latitude && taxi.coords?.longitude) {
            parsedTaxis.push({
              id,
              lat: taxi.coords.latitude,
              lng: taxi.coords.longitude,
            });
          }
        });
      }

      setTaxis(parsedTaxis);
    });

    return () => unsubscribe();
  }, []);

  return isLoaded ? (
    <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={center} 
        zoom={15}>
      {taxis.map((taxi) => (
        <Marker
          key={taxi.id}
          position={{ lat: taxi.lat, lng: taxi.lng }}
          icon={{
            url: "/assets/availableTaxi.png",
          }}
        />
      ))}
    </GoogleMap>
  ) : (
    <div>Loading map...</div>
  );
}
