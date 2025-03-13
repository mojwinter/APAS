"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

// Types
export type ParkingSpot = {
    id: number
    isAccessible: boolean
    isTaken: boolean
    status: "available" | "taken"
}

export type ParkingLocation = {
    id: number
    name: string
    address: string
    distance: string
    rating: number
    price: string
    availableSpots: number
    image: string
    zone: string
}

export type ParkingSession = {
    id: string
    zone: string
    location: string
    address: string
    startTime: string
    endTime: string
    date: string
    amount: string
    status: "Active" | "Completed" | "Upcoming"
    spotId: number
    startTimestamp?: number // Add timestamp for countdown
    endTimestamp?: number // Add timestamp for countdown
    durationMinutes?: number // Add duration in minutes
}

type ParkingContextType = {
    parkingLocations: ParkingLocation[]
    parkingHistory: ParkingSession[]
    activeSession: ParkingSession | null
    addParkingSession: (session: ParkingSession) => void
    getParkingSpots: (locationId: number) => ParkingSpot[]
    updateParkingSpot: (locationId: number, spotId: number, isTaken: boolean) => void
    getRemainingTime: (sessionId: string) => { hours: number; minutes: number; seconds: number } | null
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined)

export const useParkingContext = () => {
    const context = useContext(ParkingContext)
    if (!context) {
        throw new Error("useParkingContext must be used within a ParkingProvider")
    }
    return context
}

type ParkingProviderProps = {
    children: ReactNode
}

export const ParkingProvider: React.FC<ParkingProviderProps> = ({ children }) => {
    // Initial parking locations data
    const [parkingLocations, setParkingLocations] = useState<ParkingLocation[]>([
        {
            id: 1,
            name: "Downtown Parking",
            address: "123 Main St, Kingston",
            distance: "0.3 km",
            rating: 4.8,
            price: "$2.50/hr",
            availableSpots: 12,
            zone: "A-06",
            image:
                "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
        },
        {
            id: 2,
            name: "Waterfront Garage",
            address: "456 Harbor Dr, Kingston",
            distance: "0.7 km",
            rating: 4.5,
            price: "$3.00/hr",
            availableSpots: 5,
            zone: "B-12",
            image:
                "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
        },
        {
            id: 3,
            name: "City Center",
            address: "789 Center Ave, Kingston",
            distance: "1.2 km",
            rating: 4.2,
            price: "$2.00/hr",
            availableSpots: 20,
            zone: "C-22",
            image:
                "https://images.unsplash.com/photo-1590674899484-13d6c7094a9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
        },
        {
            id: 4,
            name: "University Parking",
            address: "101 College Rd, Kingston",
            distance: "1.5 km",
            rating: 4.0,
            price: "$1.50/hr",
            availableSpots: 8,
            zone: "D-08",
            image:
                "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
        },
    ])

    // Parking spots for each location
    const [parkingSpotsMap, setParkingSpotsMap] = useState<Record<number, ParkingSpot[]>>({
        1: [
            { id: 1, isAccessible: true, isTaken: false, status: "available" },
            { id: 2, isAccessible: true, isTaken: true, status: "taken" },
            { id: 3, isAccessible: false, isTaken: false, status: "available" },
            { id: 4, isAccessible: false, isTaken: true, status: "taken" },
            { id: 5, isAccessible: false, isTaken: false, status: "available" },
            { id: 6, isAccessible: false, isTaken: true, status: "taken" },
            { id: 7, isAccessible: false, isTaken: false, status: "available" },
            { id: 8, isAccessible: false, isTaken: false, status: "available" },
        ],
        2: [
            { id: 1, isAccessible: true, isTaken: false, status: "available" },
            { id: 2, isAccessible: false, isTaken: true, status: "taken" },
            { id: 3, isAccessible: false, isTaken: false, status: "available" },
            { id: 4, isAccessible: true, isTaken: false, status: "available" },
            { id: 5, isAccessible: false, isTaken: true, status: "taken" },
            { id: 6, isAccessible: false, isTaken: false, status: "available" },
        ],
        3: [
            { id: 1, isAccessible: true, isTaken: false, status: "available" },
            { id: 2, isAccessible: false, isTaken: false, status: "available" },
            { id: 3, isAccessible: false, isTaken: true, status: "taken" },
            { id: 4, isAccessible: false, isTaken: false, status: "available" },
            { id: 5, isAccessible: true, isTaken: false, status: "available" },
            { id: 6, isAccessible: false, isTaken: true, status: "taken" },
            { id: 7, isAccessible: false, isTaken: false, status: "available" },
            { id: 8, isAccessible: false, isTaken: false, status: "available" },
            { id: 9, isAccessible: false, isTaken: true, status: "taken" },
            { id: 10, isAccessible: false, isTaken: false, status: "available" },
        ],
        4: [
            { id: 1, isAccessible: true, isTaken: false, status: "available" },
            { id: 2, isAccessible: true, isTaken: true, status: "taken" },
            { id: 3, isAccessible: false, isTaken: false, status: "available" },
            { id: 4, isAccessible: false, isTaken: true, status: "taken" },
        ],
    })

    // Initial parking history
    const [parkingHistory, setParkingHistory] = useState<ParkingSession[]>([
        {
            id: "156",
            zone: "B-12",
            location: "Downtown Parking",
            address: "123 Main St, Kingston",
            startTime: "10:02 PM",
            endTime: "12:20 AM",
            date: "Jan 29, 2025",
            amount: "CAD $14.00",
            status: "Completed",
            spotId: 3,
        },
        {
            id: "143",
            zone: "A-05",
            location: "Waterfront Garage",
            address: "456 Harbor Dr, Kingston",
            startTime: "2:15 PM",
            endTime: "5:30 PM",
            date: "Jan 25, 2025",
            amount: "CAD $9.75",
            status: "Completed",
            spotId: 2,
        },
        {
            id: "128",
            zone: "C-22",
            location: "City Center",
            address: "789 Center Ave, Kingston",
            startTime: "9:00 AM",
            endTime: "11:45 AM",
            date: "Jan 20, 2025",
            amount: "CAD $5.50",
            status: "Completed",
            spotId: 5,
        },
        {
            id: "112",
            zone: "D-08",
            location: "University Parking",
            address: "101 College Rd, Kingston",
            startTime: "1:30 PM",
            endTime: "4:00 PM",
            date: "Jan 15, 2025",
            amount: "CAD $3.75",
            status: "Completed",
            spotId: 1,
        },
    ])

    // Get active session (if any)
    const activeSession = parkingHistory.find((session) => session.status === "Active") || null

    // Add a new parking session
    const addParkingSession = (session: ParkingSession) => {
        // Generate a random ID if not provided
        const newSession = {
            ...session,
            id: session.id || Math.floor(Math.random() * 1000).toString(),
        }

        // Add to history
        setParkingHistory((prev) => [newSession, ...prev])

        // Update parking spot status
        if (session.spotId) {
            // Find the location ID based on the zone
            const location = parkingLocations.find((loc) => loc.zone === session.zone)
            if (location) {
                updateParkingSpot(location.id, session.spotId, true)
            }
        }
    }

    // Get parking spots for a location
    const getParkingSpots = (locationId: number) => {
        return parkingSpotsMap[locationId] || []
    }

    // Update a parking spot's status
    const updateParkingSpot = (locationId: number, spotId: number, isTaken: boolean) => {
        setParkingSpotsMap((prev) => {
            const locationSpots = [...(prev[locationId] || [])]
            const spotIndex = locationSpots.findIndex((spot) => spot.id === spotId)

            if (spotIndex !== -1) {
                locationSpots[spotIndex] = {
                    ...locationSpots[spotIndex],
                    isTaken,
                    status: isTaken ? "taken" : "available",
                }
            }

            return {
                ...prev,
                [locationId]: locationSpots,
            }
        })

        // Update available spots count
        setParkingLocations((prev) => {
            return prev.map((location) => {
                if (location.id === locationId) {
                    const spots = parkingSpotsMap[locationId] || []
                    const availableSpots = spots.filter((spot) => !spot.isTaken).length - (isTaken ? 1 : -1)
                    return {
                        ...location,
                        availableSpots: Math.max(0, availableSpots),
                    }
                }
                return location
            })
        })
    }

    const getRemainingTime = (sessionId: string): { hours: number; minutes: number; seconds: number } | null => {
        const session = parkingHistory.find((s) => s.id === sessionId)
        if (!session || !session.endTimestamp || session.status !== "Active") {
            return null
        }

        const now = new Date().getTime()
        const end = session.endTimestamp
        const remaining = end - now

        if (remaining <= 0) {
            // Session has expired, update its status
            setParkingHistory((prev) => prev.map((s) => (s.id === sessionId ? { ...s, status: "Completed" } : s)))
            return null
        }

        const hours = Math.floor(remaining / (1000 * 60 * 60))
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000)

        return { hours, minutes, seconds }
    }

    const value = {
        parkingLocations,
        parkingHistory,
        activeSession,
        addParkingSession,
        getParkingSpots,
        updateParkingSpot,
        getRemainingTime, // Add this function to the context
    }

    return <ParkingContext.Provider value={value}>{children}</ParkingContext.Provider>
}

