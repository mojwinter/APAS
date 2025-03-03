import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, MapPin, Clock, Car } from 'lucide-react';
import { useParkingContext } from '../context/ParkingContext';

const BookParkingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const locationId = parseInt(id || '1');

  const {
    parkingLocations,
    getParkingSpots,
    addParkingSession
  } = useParkingContext();

  // Get location data
  const location = parkingLocations.find(loc => loc.id === locationId) || parkingLocations[0];

  // Get parking spots for this location
  const parkingSpots = getParkingSpots(locationId);

  // State for selected spot
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);

  // State for time slot
  const [timeSlot] = useState('10:02 PM - 12:20 AM');

  // Calculate price based on location and time slot
  const calculatePrice = () => {
    // Simple calculation for demo purposes
    const hourlyRate = parseFloat(location.price.replace(/[^0-9.]/g, ''));
    const hours = 2.5; // Assuming 2.5 hours for the time slot
    return `$${(hourlyRate * hours).toFixed(2)}`;
  };

  const handleSpotSelection = (spotId: number) => {
    const spot = parkingSpots.find(s => s.id === spotId);
    if (spot && !spot.isTaken) {
      setSelectedSpot(spotId);
    }
  };

  const handleBooking = () => {
    if (selectedSpot) {
      // Create a new parking session
      const now = new Date();
      const sessionId = Math.floor(Math.random() * 1000).toString();

      // Parse the time slot
      const [startTime, endTime] = timeSlot.split(' - ');

      // Format the date
      const date = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      // Calculate amount
      const amount = `CAD ${calculatePrice()}`;

      // Add the session
      addParkingSession({
        id: sessionId,
        zone: location.zone,
        location: location.name,
        address: location.address,
        startTime,
        endTime,
        date,
        amount,
        status: 'Active',
        spotId: selectedSpot
      });

      // Navigate to the details page
      navigate(`/parking-details/${sessionId}`);
    }
  };

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
              <p className="text-sm text-gray-500 mb-1">Time Slot</p>
              <button className="w-full flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <span className="font-medium text-gray-900">{timeSlot}</span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Date</p>
              <button className="w-full flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <span className="font-medium text-gray-900">
                {new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
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
                    {spot.isAccessible && (
                        <span className="absolute top-1 right-1 text-xs">♿️</span>
                    )}
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
            Book Spot {selectedSpot ? `#${selectedSpot}` : ''}
          </button>
        </div>
      </div>
  );
};

export default BookParkingPage;