  import { RideWithKey } from "../_lib/api";

  type Props = {
    ride: RideWithKey;
  };

  export default function RideLogs({ ride }: Props) {
    const pointA = ride.pointA
      ? `${ride.pointA.latitude.toFixed(6)}, ${ride.pointA.longitude.toFixed(6)}`
      : "N/A";

      const pointBFixed = ride.pointB?.toString().split(',')
    return (
      <>
        {/* Desktop row */}
        <tr className="hidden md:table-row border-b text-black border-gray-300 hover:bg-gray-100">
          <td className="p-3">{ride.id || "N/A"}</td>
          <td className="p-3">{ride.description || "N/A"}</td>
          <td className="p-3">{ride.startTime || "N/A"}</td>
          <td className="p-3">{ride.endTime || "N/A"}</td>
          <td className="p-3">{pointA}</td>
          <td className="p-3">{pointBFixed ? `${Number(pointBFixed[0]).toFixed(6)}, ${Number(pointBFixed[1]).toFixed(6)}` : "N/A"}</td>
          <td className="p-3">{ride.price} KM</td>
        </tr>
        {/* Mobile card */}
        <div className="md:hidden bg-white mb-4 p-4 rounded shadow-lg text-black">
          <div>
            <strong className="text-gray-600">Driver ID:</strong> {ride.id || "N/A"}
          </div>
          <div>
            <strong className="text-gray-600">Description:</strong> {ride.description || "N/A"}
          </div>
          <div>
            <strong className="text-gray-600">Start Time:</strong> {ride.startTime || "N/A"}
          </div>
          <div>
            <strong className="text-gray-600">End Time:</strong> {ride.endTime || "N/A"}
          </div>
          <div>
            <strong className="text-gray-600">Point A:</strong> {pointA}
          </div>
          <div>
            <strong className="text-gray-600">Point B:</strong> {ride.pointB ? `${ride.pointB}` : "N/A"}
          </div>
          <div>
            <strong className="text-gray-600">Price:</strong> {ride.price} KM
          </div>
        </div>
      </>
    );
  }
