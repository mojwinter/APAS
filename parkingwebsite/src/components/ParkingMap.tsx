import React from 'react';
import { ParkingSpot } from '../types';

interface ParkingMapProps {
  spots: ParkingSpot[];
  locationId: string;
}

const ParkingMap: React.FC<ParkingMapProps> = ({ spots, locationId }) => {
  const locationSpots = spots.filter(spot => spot.locationId === locationId);
  
  // Group spots by zone
  const spotsByZone: Record<string, ParkingSpot[]> = {};
  locationSpots.forEach(spot => {
    const zone = spot.zone.split('-')[0];
    if (!spotsByZone[zone]) {
      spotsByZone[zone] = [];
    }
    spotsByZone[zone].push(spot);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'occupied':
        return 'bg-red-500';
      case 'reserved':
        return 'bg-yellow-500';
      case 'maintenance':
        return 'bg-gray-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Parking Map</h2>
      
      <div className="space-y-6">
        {Object.entries(spotsByZone).map(([zone, zoneSpots]) => (
          <div key={zone} className="border rounded-lg p-4">
            <h3 className="text-md font-medium mb-3">Zone {zone}</h3>
            
            <div className="grid grid-cols-8 gap-2">
              {zoneSpots.map(spot => (
                <div 
                  key={spot.id} 
                  className={`${getStatusColor(spot.status)} rounded-md p-2 text-white text-center relative ${spot.isAccessible ? 'border-2 border-blue-500' : ''}`}
                >
                  <span className="text-xs">{spot.spotNumber}</span>
                  {spot.isAccessible && (
                    <span className="absolute -top-1 -right-1 text-blue-500 text-lg">♿</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-center space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
          <span className="text-sm">Occupied</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded-sm mr-2"></div>
          <span className="text-sm">Reserved</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-500 rounded-sm mr-2"></div>
          <span className="text-sm">Maintenance</span>
        </div>
      </div>
    </div>
  );
};

export default ParkingMap;