import React, { useState } from 'react';
import Header from '../components/Header';
import { parkingLocations, parkingSpots } from '../data/mockData';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import ParkingMap from '../components/ParkingMap';

const Locations: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(parkingLocations[0].id);

  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
      <Header title="Parking Locations" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Locations</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus size={18} className="mr-2" />
            Add Location
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {parkingLocations.map((location) => (
            <div 
              key={location.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all ${
                selectedLocation === location.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedLocation(location.id)}
            >
              <div className="h-40 bg-gray-200 relative">
                {location.image && (
                  <img 
                    src={location.image} 
                    alt={location.name} 
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold flex items-center">
                  <span className={location.availableSpots > 0 ? 'text-green-500' : 'text-red-500'}>
                    {location.availableSpots} / {location.totalSpots} spots
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg">{location.name}</h3>
                <p className="text-gray-500 text-sm flex items-center mt-1">
                  <MapPin size={14} className="mr-1" />
                  {location.address}
                </p>
                
                <div className="mt-3 flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium">${location.pricePerHour.toFixed(2)}/hr</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedLocation && (
          <ParkingMap 
            spots={parkingSpots} 
            locationId={selectedLocation} 
          />
        )}
      </div>
    </div>
  );
};

export default Locations;