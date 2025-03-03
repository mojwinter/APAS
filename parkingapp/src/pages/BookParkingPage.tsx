"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, MapPin, Clock, Car } from "lucide-react"
import { useParkingContext } from "../context/ParkingContext"

const BookParkingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const locationId = Number.parseInt(id || "1")

  const { parkingLocations, getParkingSpots, addParkingSession } = useParkingContext()

  // Get location data
  const location = parkingLocations.find((loc) => loc.id === locationId) || parkingLocations[0]

  // Get parking spots for this location
  const parkingSpots = getParkingSpots(locationId)

  // State for selected spot
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null)

  // State for time slot
  const [selectedDate] = useState<Date>(new Date())
  const [startTime] = useState<Date>(new Date())
  const [duration, setDuration] = useState<number>(60) // Default 60 minutes
  const [endTime, setEndTime] = useState<Date>(new Date(new Date().getTime() + 60 * 60 * 1000)) // Default +1 hour

  const durationOptions = [
    { value: 30, label: "30 minutes" },
    { value: 60, label: "1 hour" },
    { value: 120, label: "2 hours" },
    { value: 180, label: "3 hours" },
    { value: 240, label: "4 hours" },
  ]

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
  }

  const updateEndTime = (start: Date, durationMinutes: number): Date => {
    return new Date(start.getTime() + durationMinutes * 60 * 1000)
  }

  useEffect(() => {
    const newEndTime = updateEndTime(startTime, duration)
    setEndTime(newEndTime)
  }, [startTime, duration])

  // Calculate price based on location and time slot
  const calculatePrice = () => {
    const hourlyRate = Number.parseFloat(location.price.replace(/[^0-9.]/g, ""))
    const hours = duration / 60 // Convert minutes to hours
    return `$${(hourlyRate * hours).toFixed(2)}`
  }

  const handleSpotSelection = (spotId: number) => {
    const spot = parkingSpots.find((s) => s.id === spotId)
    if (spot && !spot.isTaken) {
      setSelectedSpot(spotId)
    }
  }

  const handleBooking = () => {
    if (selectedSpot) {
      // Create a new parking session
      const sessionId = Math.floor(Math.random() * 1000).toString()

      // Format the times for display
      const formattedStartTime = formatTime(startTime)
      const formattedEndTime = formatTime(endTime)

      // Format the date
      const date = selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })

      // Calculate amount
      const amount = `CAD ${calculatePrice()}`

      // Add the session with actual timestamps for countdown
      addParkingSession({
        id: sessionId,
        zone: location.zone,
        location: location.name,
        address: location.address,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        date,
        amount,
        status: "Active",
        spotId: selectedSpot,
        startTimestamp: startTime.getTime(),
        endTimestamp: endTime.getTime(),
        durationMinutes: duration,
      })

      // Navigate to the details page
      navigate(`/parking-details/${sessionId}`)
    }
  }

  return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-gray-100">
          <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Book Parking</h1>
          <div className="w-10"></div> {/* Empty div for spacing */}
        </div>

        {/* Booking Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Location Info */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900">{location.name}</h2>
                <p className="text-sm text-gray-500">{location.address}</p>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Open 24/7</span>
              </div>
              <div className="flex items-center gap-1">
                <Car className="h-4 w-4" />
                <span>{location.availableSpots} spots available</span>
              </div>
            </div>
          </div>

          {/* Zone and Time Selection */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5">
            <h3 className="font-bold text-gray-900 mb-3">Parking Details</h3>

            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
              <div>
                <p className="text-sm text-gray-500">Zone</p>
                <p className="text-xl font-bold text-gray-900">{location.zone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-xl font-bold text-gray-900">{calculatePrice()}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <select
                  className="w-full bg-gray-50 rounded-lg p-3 font-medium text-gray-900"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
              >
                {durationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} ($
                      {((Number.parseFloat(location.price.replace(/[^0-9.]/g, "")) * option.value) / 60).toFixed(2)})
                    </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Start Time</p>
              <div className="w-full bg-gray-50 rounded-lg p-3 font-medium text-gray-900">{formatTime(startTime)}</div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">End Time</p>
              <div className="w-full bg-gray-50 rounded-lg p-3 font-medium text-gray-900">{formatTime(endTime)}</div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Date</p>
              <div className="w-full bg-gray-50 rounded-lg p-3 font-medium text-gray-900">
                {selectedDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Spot Selection */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5">
            <h3 className="font-bold text-gray-900 mb-3">Select From Available Spots</h3>

            <div className="grid grid-cols-4 gap-3">
              {parkingSpots.map((spot) => (
                  <button
                      key={spot.id}
                      className={`h-14 rounded-lg flex items-center justify-center ${
                          spot.isTaken
                              ? "bg-red-100 text-red-500 cursor-not-allowed"
                              : spot.id === selectedSpot
                                  ? "bg-emerald-500 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } ${spot.isAccessible ? "relative" : ""}`}
                      onClick={() => !spot.isTaken && handleSpotSelection(spot.id)}
                      disabled={spot.isTaken}
                  >
                    <span className="font-bold">{spot.id}</span>
                    {spot.isAccessible && <span className="absolute top-1 right-1 text-xs">♿️</span>}
                  </button>
              ))}
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                <span className="text-gray-600">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-100"></div>
                <span className="text-gray-600">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-100"></div>
                <span className="text-gray-600">Taken</span>
              </div>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <div className="p-5 border-t border-gray-100">
          <button
              className={`w-full py-3 rounded-lg text-sm font-medium text-white ${
                  selectedSpot
                      ? "bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={handleBooking}
              disabled={!selectedSpot}
          >
            Book Spot {selectedSpot ? `#${selectedSpot}` : ""}
          </button>
        </div>
      </div>
  )
}

export default BookParkingPage

