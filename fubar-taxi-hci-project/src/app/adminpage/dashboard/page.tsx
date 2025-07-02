"use client";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { db } from "@/app/firebase/config";
import { ref, onValue, push } from "firebase/database";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface Taxi {
  id: string;
  lat: number;
  lng: number;
  state: number;
  username: string;
}

interface FirebaseTaxiData {
  coords: {
    latitude: number;
    longitude: number;
  };
  state: number;
  username: string;
}

export default function TaxiMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const [taxis, setTaxis] = useState<Taxi[]>([]);
  const [selectedTaxiId, setSelectedTaxiId] = useState<string | null>(null);
  const [originMarker, setOriginMarker] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [destinationMarker, setDestinationMarker] =
    useState<google.maps.LatLngLiteral | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRefs = useRef<{ [id: string]: google.maps.Marker }>({});
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

const handleAddingRide = (taxiID: string) => {
  if (!originMarker) {
    alert("Customer location is missing!");
    return;
  }

  const description = prompt("Enter description: ", "Description of the location");
  if (!description) {
    alert("Missing description! Try again");
    return;
  }

  const rideData = {
    id: taxiID,
    description,
    pickup: originMarker
      ? `${originMarker.lat}, ${originMarker.lng}`
      : null,
    destination: destinationMarker
      ? `${destinationMarker.lat}, ${destinationMarker.lng}`
      : null,
  };

  const ridesRef = ref(db, `GellaTaxi/Taxi/${taxiID}/rides`);

  push(ridesRef, rideData)
    .then(() => {
      console.log("Podaci uspješno dodani u Firebase");
    })
    .catch((error) => {
      console.error("Greška prilikom unosa podataka:", error);
    });

  setOriginMarker(null);
  setDestinationMarker(null);
  };

  useEffect(() => {
    const taxiRef = ref(db, "GellaTaxi/Taxi");

    const unsubscribe = onValue(taxiRef, (snapshot) => {
      const data = snapshot.val();
      const parsedTaxis: Taxi[] = [];

      if (data) {
        Object.entries(data).forEach(([id, value]) => {
          const taxi = value as FirebaseTaxiData;

          if (taxi.coords.latitude && taxi.coords.longitude) {
            parsedTaxis.push({
              id,
              lat: taxi.coords.latitude,
              lng: taxi.coords.longitude,
              state: taxi.state,
              username: taxi.username,
            });
          }
        });
      }

      setTaxis(parsedTaxis);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (mapRef.current && taxis.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      taxis.forEach((taxi) => {
        bounds.extend({ lat: taxi.lat, lng: taxi.lng });
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [taxis]);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const handleMapClick = () => {
    setSelectedTaxiId(null);
  };

  const handleLongPressStart = (e: google.maps.MapMouseEvent) => {
    if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
    longPressTimeout.current = setTimeout(() => {
      if (!originMarker) {
        setOriginMarker(e.latLng!.toJSON());
      } else if (!destinationMarker) {
        setDestinationMarker(e.latLng!.toJSON());
      }
    }, 500); // 600ms to trigger long press
  };

  const handleRightClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const coords = e.latLng.toJSON();

    if (!originMarker) {
      setOriginMarker(coords);
    } else if (!destinationMarker) {
      setDestinationMarker(coords);
    }
  };

  const handleLongPressEnd = () => {
    if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
  };

  const handleMarkerDoubleClick = (markerType: "origin" | "destination") => {
    if (markerType === "origin") setOriginMarker(null);
    if (markerType === "destination") setDestinationMarker(null);
  };

  const selectedTaxi = taxis.find((taxi) => taxi.id === selectedTaxiId) || null;

  const getMarkerIcon = (state: number) => {
    switch (state) {
      case 0:
        return "/assets/availableTaxi.png";
      case 1:
        return "/assets/busyTaxi.png";
      case 2:
        return "/assets/onbreakTaxi.png";
      default:
        return "/assets/availableTaxi.png";
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={handleMapLoad}
      onClick={handleMapClick}
      onRightClick={handleRightClick}
      onMouseDown={handleLongPressStart}
      onMouseUp={handleLongPressEnd}
      zoom={15}
      options={{
        gestureHandling: "greedy",
        scrollwheel: true,
      }}
    >
      {taxis.map((taxi) => (
        <Marker
          key={taxi.id}
          position={{ lat: taxi.lat, lng: taxi.lng }}
          icon={{ url: getMarkerIcon(taxi.state) }}
          onClick={() => setSelectedTaxiId(taxi.id)}
          onLoad={(marker) => {
            markerRefs.current[taxi.id] = marker;
          }}
        />
      ))}

      {originMarker && (
        <Marker
          position={originMarker}
          icon={{ url: "/assets/origin.png" }}
          onDblClick={() => handleMarkerDoubleClick("origin")}
          title="Origin"
        />
      )}

      {destinationMarker && (
        <Marker
          position={destinationMarker}
          icon={{ url: "/assets/destination.png" }}
          onDblClick={() => handleMarkerDoubleClick("destination")}
          title="Destination"
        />
      )}

      {selectedTaxi && markerRefs.current[selectedTaxi.id] && (
        <InfoWindow
          key={selectedTaxi.id}
          anchor={markerRefs.current[selectedTaxi.id]}
          onCloseClick={() => setSelectedTaxiId(null)}
        >
          <div className="text-sm text-gray-800 space-y-2 max-w-[300px]">
            <h2 className="font-bold text-lg">
              Driver: {selectedTaxi.username}
            </h2>
            <p>
              Status:{" "}
              {selectedTaxi.state === 0
                ? "available"
                : selectedTaxi.state === 1
                ? "busy"
                : "on break"}
            </p>
            <button
              className="px-3 py-1 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 transition text-m"
              onClick={() => handleAddingRide(selectedTaxi.id)}
            >
              Assign Ride
            </button>
          </div>
        </InfoWindow>
      )}


<div className="absolute right-4 top-[40%] flex flex-col space-y-2 z-10">
  {taxis.map((taxi) => (
    <button
      key={taxi.id}
      className="bg-white text-black shadow-lg rounded-2xl p-2 text-md hover:bg-gray-100 transition"
      onClick={() => mapRef.current?.panTo({ lat: taxi.lat, lng: taxi.lng })}
    >
      {taxi.username}
    </button>
  ))}
</div>


    </GoogleMap>
  ) : (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
