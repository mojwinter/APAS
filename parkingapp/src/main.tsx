import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
import App from "./App"
import { ParkingProvider } from "./context/ParkingContext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HashRouter>
            <ParkingProvider>
                <App />
            </ParkingProvider>
        </HashRouter>
    </React.StrictMode>,
)

