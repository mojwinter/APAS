import { create } from "zustand"

interface ParkingSpotStatus {
    [key: string]: "occupied" | "empty" | "expired"
}

interface ParkingStore {
    spotStatus: ParkingSpotStatus
    updateSpotStatus: (status: ParkingSpotStatus) => void
    websocketStatus: "connected" | "disconnected" | "error"
    setWebsocketStatus: (status: "connected" | "disconnected" | "error") => void
}

export const useParkingStore = create<ParkingStore>((set) => ({
    spotStatus: {},
    websocketStatus: "disconnected",
    updateSpotStatus: (status) => set({ spotStatus: status }),
    setWebsocketStatus: (status) => set({ websocketStatus: status }),
}))

// Initialize WebSocket connection
export const initWebSocket = () => {
    const store = useParkingStore.getState()

    try {
        // Use a more reliable WebSocket URL (you may need to adjust this)
        const ws = new WebSocket("ws://192.168.2.169:8765")

        ws.onopen = () => {
            store.setWebsocketStatus("connected")
            console.log("WebSocket Connected")
        }

        ws.onmessage = (event) => {
            try {
                console.log("Received Data:", event.data)
                const data = JSON.parse(event.data)

                // Process the data to handle the new status types
                const processedData: ParkingSpotStatus = {}

                // Convert the incoming data to our new status types
                Object.entries(data).forEach(([key, value]) => {
                    if (value === "occupied") {
                        // For simplicity, we'll treat all "occupied" as paid
                        processedData[key] = "occupied"
                    } else if (value === "empty") {
                        processedData[key] = "empty"
                    } else if (value === "expired") {
                        processedData[key] = "expired"
                    }
                })

                // Update the store with the processed data
                store.updateSpotStatus(processedData)
            } catch (error) {
                console.error("Error parsing WebSocket data:", error)
            }
        }

        ws.onerror = (error) => {
            console.error("WebSocket Error:", error)
            store.setWebsocketStatus("error")
        }

        ws.onclose = () => {
            store.setWebsocketStatus("disconnected")
            console.log("WebSocket Disconnected - Retrying in 5s...")
            setTimeout(() => initWebSocket(), 5000)
        }

        return ws
    } catch (error) {
        console.error("WebSocket Connection Error:", error)
        store.setWebsocketStatus("error")
        setTimeout(() => initWebSocket(), 5000)
        return null
    }
}

