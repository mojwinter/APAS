import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, MapPin, Clock, Calendar } from 'lucide-react';

const BookParkingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Mock parking data based on id
  const parkingData = {
    name: 'Downtown Parking',
    address: '123 Main St, Kingston',
    zone: 'A-06',
    price: '$14',
    timeSlot: '10:02 PM - 12:20AM',
  };
  
  // State for selected spot
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  
  // Define parking spots with their status
  const parkingSpots = [
    { id: 1, isAccessible: true, isTaken: false, status: 'available' },
    { id: 2, isAccessible: true, isTaken: true, status: 'taken' },
    { id: 3, isAccessible: false, isTaken: false, status: 'available' },
    { id: 4, isAccessible: false, isTaken: true, status: 'taken' },
    { id: 5, isAccessible: false, isTaken: false, status: 'available' },
    { id: 6, isAccessible: false, isTaken: true, status: 'taken' },
    { id: 7, isAccessible: false, isTaken: false, status: 'available' },
    { id: 8, isAccessible: false, isTaken: false, status: 'available' },
  ];
  
  const handleSpotSelection = (spotId: number) => {
    const spot = parkingSpots.find(s => s.id === spotId);
    if (spot && !spot.isTaken) {
      setSelectedSpot(spotId);
    }
  };
  
  const handleBooking = () => {
    if (selectedSpot) {
      navigate(`/parking-details/${selectedSpot}`);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Map */}
      <div className="relative h-56 bg-gray-200">
        <div className="absolute top-0 left-0 w-full p-5 flex items-center">
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 ml-4">Parking Map</h1>
        </div>
        
        {/* Map Placeholder with Pin */}
        <div className="h-full w-full flex items-center justify-center">
          <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center relative">
            <MapPin className="h-6 w-6 text-white absolute -top-6" />
            <div className="h-3 w-3 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Booking Content */}
      <div className="flex-1 p-5">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">Book your car</h2>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">Parking</h3>
        </div>
        
        {/* Zone and Time Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500">Zone</p>
              <p className="text-3xl font-bold text-gray-900">{parkingData.zone}</p>
            </div>
            <div className="bg-gray-100 rounded-lg h-20 w-20 flex items-center justify-center">
              <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center relative">
                <MapPin className="h-5 w-5 text-white absolute -top-5" />
                <div className="h-2 w-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Time Slot</p>
              <div className="flex items-center">
                <p className="font-medium text-gray-900">{parkingData.timeSlot}</p>
                <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
              </div>
            </div>
            <p className="text-xl font-bold text-gray-900">{parkingData.price}</p>
          </div>
        </div>
        
        {/* Spot Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5">
          <h3 className="font-bold text-gray-900 mb-3">Select From Available Spots</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {parkingSpots.map((spot) => (
              <button
                key={spot.id}
                className={`h-14 rounded-lg flex items-center justify-center ${
                  spot.isTaken 
                    ? "bg-red-400 cursor-not-allowed" 
                    : spot.id === selectedSpot
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                } ${spot.isAccessible ? "relative" : ""}`}
                onClick={() => !spot.isTaken && handleSpotSelection(spot.id)}
                disabled={spot.isTaken}
              >
                {spot.isAccessible && (
                  <span className="text-xl absolute">♿️</span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Location Details */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{parkingData.name}</p>
              <p className="text-sm text-gray-500">{parkingData.address}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Jan 29, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{parkingData.timeSlot}</span>
            </div>
          </div>
        </div>
        
        {/* Book Button */}
        <button
          className={`w-full py-3 rounded-lg text-sm font-medium text-white ${
            selectedSpot 
              ? "bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500" 
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={handleBooking}
          disabled={!selectedSpot}
        >
          Start Booking
        </button>
      </div>
    </div>
  );
};

export default BookParkingPage;