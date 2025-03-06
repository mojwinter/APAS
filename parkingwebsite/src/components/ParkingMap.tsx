"use client"

import type React from "react"
import { useEffect } from "react"
import type { ParkingSpot } from "../types"
import { useParkingStore, initWebSocket } from "../store/parkingStore"
import { AlertTriangle } from "lucide-react"

interface ParkingMapProps {
  spots: ParkingSpot[]
  locationId: string
}

const ParkingMap: React.FC<ParkingMapProps> = ({ spots, locationId }) => {
  const { spotStatus, websocketStatus } = useParkingStore()

  useEffect(() => {
    // Initialize WebSocket connection when component mounts
    const ws = initWebSocket()

    // Cleanup on unmount
    return () => {
      if (ws) ws.close()
    }
  }, [])

  const locationSpots = spots.filter((spot) => spot.locationId === locationId)
  const isUniversityParking = locationSpots.some((spot) => spot.locationId === "loc4") // University Parking ID

  // Group spots by zone
  const spotsByZone: Record<string, ParkingSpot[]> = {}
  locationSpots.forEach((spot) => {
    const zone = spot.zone.split("-")[0]
    if (!spotsByZone[zone]) {
      spotsByZone[zone] = []
    }
    spotsByZone[zone].push(spot)
  })

  const getStatusColor = (spotNumber: string) => {
    // For University Parking, use the WebSocket data
    if (isUniversityParking) {
      // Check real-time status from WebSocket if available
      const realtimeStatus = spotStatus[`spot_${spotNumber}`]

      if (realtimeStatus === "occupied") {
        return "bg-red-500"
      } else if (realtimeStatus === "empty") {
        return "bg-green-500"
      }
    }

    // Fallback to default status for other locations or if WebSocket data is not available
    switch (spots.find((s) => s.spotNumber === spotNumber)?.status) {
      case "available":
        return "bg-green-500"
      case "occupied":
        return "bg-red-500"
      case "reserved":
        return "bg-yellow-500"
      case "maintenance":
        return "bg-gray-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Parking Map</h2>
          <div
              className={`flex items-center ${
                  websocketStatus === "connected"
                      ? "text-green-500"
                      : websocketStatus === "error"
                          ? "text-red-500"
                          : "text-yellow-500"
              }`}
          >
            <div
                className={`w-2 h-2 rounded-full mr-2 ${
                    websocketStatus === "connected"
                        ? "bg-green-500"
                        : websocketStatus === "error"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                }`}
            ></div>
            {websocketStatus === "connected" ? (
                "Live"
            ) : websocketStatus === "error" ? (
                <span className="flex items-center">
              <AlertTriangle size={16} className="mr-1" />
              Connection Error
            </span>
            ) : (
                "Connecting..."
            )}
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(spotsByZone).map(([zone, zoneSpots]) => (
              <div key={zone} className="border rounded-lg p-4">
                <h3 className="text-md font-medium mb-3">Zone {zone}</h3>

                <div className="grid grid-cols-5 gap-2">
                  {zoneSpots.map((spot) => (
                      <div
                          key={spot.id}
                          className={`${getStatusColor(spot.spotNumber)} rounded-md p-2 text-white text-center relative ${spot.isAccessible ? "border-2 border-blue-500" : ""}`}
                      >
                        <span className="text-xs">{spot.spotNumber}</span>
                        {spot.isAccessible && <span className="absolute -top-1 -right-1 text-blue-500 text-lg">♿</span>}
                      </div>
                  ))}
                </div>
              </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
            <span className="text-sm">Occupied</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-sm mr-2"></div>
            <span className="text-sm">Reserved</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-500 rounded-sm mr-2"></div>
            <span className="text-sm">Maintenance</span>
          </div>
        </div>
      </div>
  )
}

export default ParkingMap

