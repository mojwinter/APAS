import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import ParkingDetailsPage from "./pages/ParkingDetailsPage"
import FindParkingPage from "./pages/FindParkingPage"
import ProfilePage from "./pages/ProfilePage"
import HistoryPage from "./pages/HistoryPage"
import BookParkingPage from "./pages/BookParkingPage"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="parking-details/:id" element={<ParkingDetailsPage />} />
                <Route path="find-parking" element={<FindParkingPage />} />
                <Route path="book-parking/:id" element={<BookParkingPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="history" element={<HistoryPage />} />
            </Route>
        </Routes>
    )
}

export default App

