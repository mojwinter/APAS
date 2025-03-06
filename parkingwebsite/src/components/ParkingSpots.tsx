import type React from "react"

interface ParkingSpot {
    id: number
    status: string
    endTime?: string
}

const isExpired = (endTime: string): boolean => {
    const now = new Date()
    const end = new Date(endTime)
    return now > end
}

const getStatusBadgeClass = (status: string, endTime?: string) => {
    if (status === "occupied" && endTime && isExpired(endTime)) {
        return "bg-red-100 text-red-800" // Expired
    }

    switch (status) {
        case "available":
            return "bg-green-100 text-green-800"
        case "occupied":
            return "bg-blue-100 text-blue-800" // Occupied and paid
        case "expired":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const ParkingSpots: React.FC<{ spots: ParkingSpot[] }> = ({ spots }) => {
    return (
        <div>
            {spots.map((spot) => (
                <div key={spot.id} className="p-4 border border-gray-200 rounded-lg mb-4">
                    <div className="flex items-center">
                        <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${getStatusBadgeClass(
                                spot.status,
                                spot.endTime,
                            )}`}
                        >
                            {spot.status === "occupied" && spot.endTime && isExpired(spot.endTime) ? "Expired" : spot.status}
                        </div>
                        <div className="ml-4">Spot ID: {spot.id}</div>
                    </div>
                    {spot.status === "occupied" && spot.endTime && (
                        <div>Ends at: {new Date(spot.endTime).toLocaleTimeString()}</div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ParkingSpots

