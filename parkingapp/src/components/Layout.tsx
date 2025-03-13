import type React from "react"
import { Outlet } from "react-router-dom"
import Navigation from "./Navigation"

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="flex-1 max-w-md mx-auto w-full bg-white shadow-xl overflow-hidden flex flex-col">
                {/* Add ios-safe-area-pt class for top padding */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
                <Navigation />
            </div>
        </div>
    )
}

export default Layout

