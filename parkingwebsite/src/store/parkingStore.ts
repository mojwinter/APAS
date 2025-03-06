import { create } from "zustand"

interface ParkingSpotStatus {
    [key: string]: "occupied" | "empty"
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
                // Update the store with the received data
                store.updateSpotStatus(data)
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

