"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Check, Download, MapPin, Clock, Calendar, CreditCard, AlertTriangle } from "lucide-react"
import { useParkingContext } from "../context/ParkingContext"

const CountdownTimer: React.FC<{ sessionId: string }> = ({ sessionId }) => {
  const { getRemainingTime } = useParkingContext()
  const [remaining, setRemaining] = useState<{ minutes: number; seconds: number } | null>(null)

  useEffect(() => {
    // Initial check
    setRemaining(getRemainingTime(sessionId))

    // Update every second
    const interval = setInterval(() => {
      const time = getRemainingTime(sessionId)
      setRemaining(time)

      // If time is up, clear the interval
      if (!time) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [sessionId, getRemainingTime])

  if (!remaining) {
    return (
        <div className="flex items-center justify-center gap-3 bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <span className="font-medium text-yellow-800">Session expired</span>
        </div>
    )
  }

  return (
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 text-white">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{remaining.minutes.toString().padStart(2, "0")}</div>
            <div className="text-xs text-white/80 uppercase tracking-wider mt-1">Minutes</div>
          </div>
          <div className="text-3xl font-bold">:</div>
          <div className="text-center">
            <div className="text-3xl font-bold">{remaining.seconds.toString().padStart(2, "0")}</div>
            <div className="text-xs text-white/80 uppercase tracking-wider mt-1">Seconds</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-3 text-sm text-white/90">
          <Clock className="h-4 w-4" />
          <span>Time remaining</span>
        </div>
      </div>
  )
}

const ParkingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { parkingHistory, parkingLocations, getParkingSpots, getRemainingTime } = useParkingContext()

  // Find the session by ID
  const session = parkingHistory.find((s) => s.id === id)

  // If session not found, redirect to history
  useEffect(() => {
    if (!session) {
      navigate("/history")
    }
  }, [session, navigate])

  if (!session) {
    return null
  }

  // Find the location based on the zone
  const location = parkingLocations.find((loc) => loc.zone === session.zone)

  // Get parking spots for this location
  const parkingSpots = location ? getParkingSpots(location.id) : []

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
          <h1 className="text-xl font-bold text-gray-900">Parking Details</h1>
          <button className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 transition-colors">
            <Download className="h-5 w-5" />
            <span className="text-sm font-medium">Receipt</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {/* Parking Status */}
          <div className="mb-5">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-emerald-600">P</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-gray-900">Zone {session.zone}</h2>
                    <p className="text-sm text-gray-500">Spot #{session.spotId}</p>
                  </div>
                </div>
                <div className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-1">
                  <span className="text-sm font-medium">{session.status}</span>
                </div>
              </div>

              {/* Countdown Timer */}
              {session.status === "Active" && (
                  <div className="mb-4">
                    <CountdownTimer sessionId={session.id} />
                  </div>
              )}

              {/* Dynamic Parking Spots Grid */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {parkingSpots.length > 0
                    ? parkingSpots.map((spot) => (
                        <div
                            key={spot.id}
                            className={`h-6 rounded-full flex items-center justify-center ${
                                spot.id === session.spotId
                                    ? "bg-yellow-400/80 border-2 border-white" // Highlight user's spot
                                    : spot.isTaken
                                        ? "bg-red-400/50"
                                        : "bg-green-400/50"
                            }`}
                        >
                          {spot.isAccessible && <span className="text-xs">♿️</span>}
                          {spot.id === session.spotId && <span className="text-xs font-bold text-white">YOU</span>}
                        </div>
                    ))
                    : // Fallback if no spots data available
                    Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className={`h-6 rounded-full ${
                                index + 1 === session.spotId
                                    ? "bg-yellow-400/80 border-2 border-white flex items-center justify-center"
                                    : index % 3 === 0
                                        ? "bg-red-400/50"
                                        : "bg-green-400/50"
                            }`}
                        >
                          {index + 1 === session.spotId && <span className="text-xs font-bold text-white">YOU</span>}
                        </div>
                    ))}
              </div>
            </div>
          </div>

          {/* Time Details */}
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Parking Duration</h2>
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-bold text-gray-900">{session.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-bold text-gray-900">{session.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Time</p>
                    <p className="font-bold text-gray-900">{session.startTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Time</p>
                    <p className="font-bold text-gray-900">{session.endTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Activity Log</h2>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-base font-bold text-gray-900">{session.startTime}</span>
                  <span className="text-sm text-gray-400">{session.date}</span>
                </div>
                <p className="text-sm text-gray-600">Parking session started</p>
              </div>

              {session.status === "Completed" && (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-base font-bold text-gray-900">{session.endTime}</span>
                      <span className="text-sm text-gray-400">{session.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">Parking session expired</p>
                  </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Footer */}
        <div className="border-t border-gray-100 p-5 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                <CreditCard className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">•••• 7215</div>
                <div className="text-xs text-gray-500">Mitchell Winter</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Total Amount</div>
              <div className="flex items-center gap-3">
                <div className="text-lg font-bold text-gray-900">{session.amount}</div>
                <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ParkingDetailsPage