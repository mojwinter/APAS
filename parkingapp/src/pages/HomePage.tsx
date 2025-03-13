"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Car, MapPin, Clock, ChevronRight, AlertTriangle } from "lucide-react"
import { useParkingContext } from "../context/ParkingContext"

const HomeCountdownTimer: React.FC<{ sessionId: string }> = ({ sessionId }) => {
    const { getRemainingTime } = useParkingContext()
    const [remaining, setRemaining] = useState<{ hours: number; minutes: number; seconds: number } | null>(null)

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
            <div className="flex items-center gap-2 text-white/90">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Session expired</span>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
                {remaining.hours > 0 && (
                    <>
                        <div className="bg-white/20 rounded-lg px-3 py-2">
                            <span className="text-xl font-bold">{remaining.hours.toString().padStart(2, "0")}</span>
                            <span className="text-xs ml-1">hr</span>
                        </div>
                        <span className="text-xl font-bold">:</span>
                    </>
                )}
                <div className="bg-white/20 rounded-lg px-3 py-2">
                    <span className="text-xl font-bold">{remaining.minutes.toString().padStart(2, "0")}</span>
                    <span className="text-xs ml-1">min</span>
                </div>
                <span className="text-xl font-bold">:</span>
                <div className="bg-white/20 rounded-lg px-3 py-2">
                    <span className="text-xl font-bold">{remaining.seconds.toString().padStart(2, "0")}</span>
                    <span className="text-xs ml-1">sec</span>
                </div>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
                <Clock className="h-4 w-4" />
                <span>Time remaining</span>
            </div>
        </div>
    )
}

const HomePage: React.FC = () => {
    const { activeSession, parkingLocations } = useParkingContext()

    // Get recent locations (first 3 from the list)
    const recentLocations = parkingLocations.slice(0, 3)

    return (
        <div className="page-container">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hello, Mitchell</h1>
                    <p className="text-gray-500">Find your perfect parking spot</p>
                </div>
                <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-700">MW</span>
                </div>
            </div>

            {/* Active Parking Session */}
            {activeSession && (
                <Link to={`/parking-details/${activeSession.id}`} className="block mb-6">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                                    <Car className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg">Active Parking</h2>
                                    <p className="text-sm text-white/80">Zone {activeSession.zone}</p>
                                </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-white/80" />
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-white/80" />
                                <span className="text-sm">{activeSession.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-white/80" />
                                <span className="text-sm">
                  {activeSession.startTime} - {activeSession.endTime}
                </span>
                            </div>
                        </div>
                        {/* Countdown Timer */}
                        <div className="mt-4 pt-4 border-t border-white/20">
                            <HomeCountdownTimer sessionId={activeSession.id} />
                        </div>
                    </div>
                </Link>
            )}

            {/* Quick Actions */}
            <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                    <Link
                        to="/find-parking"
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3"
                    >
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-emerald-600" />
                        </div>
                        <span className="font-medium text-gray-900">Find Parking</span>
                    </Link>
                    <Link
                        to="/history"
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3"
                    >
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-emerald-600" />
                        </div>
                        <span className="font-medium text-gray-900">History</span>
                    </Link>
                </div>
            </div>

            {/* Recent Locations */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">Recent Locations</h2>
                <div className="space-y-3">
                    {recentLocations.map((location) => (
                        <Link
                            key={location.id}
                            to={`/book-parking/${location.id}`}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-gray-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{location.name}</p>
                                    <p className="text-sm text-gray-500">{location.address}</p>
                                </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage

