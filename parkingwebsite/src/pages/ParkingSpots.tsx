import React, { useState } from 'react';
import Header from '../components/Header';
import { parkingSpots, parkingLocations } from '../data/mockData';
import { Car, Filter, Clock, Edit } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ParkingSpots: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  
  const filteredSpots = parkingSpots.filter(spot => {
    if (filter !== 'all' && spot.status !== filter) return false;
    if (locationFilter !== 'all' && spot.locationId !== locationFilter) return false;
    return true;
  });
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'maintenance':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTimeRemaining = (endTime?: string) => {
    if (!endTime) return 'N/A';
    
    const end = new Date(endTime);
    const now = new Date();
    
    if (end <= now) {
      return 'Expired';
    }
    
    return formatDistanceToNow(end, { addSuffix: true });
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
      <Header title="Parking Spots" />
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <h2 className="text-xl font-semibold flex items-center">
            <Car size={20} className="mr-2 text-blue-500" />
            All Parking Spots
          </h2>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2">
              <Filter size={16} className="text-gray-400 mr-2" />
              <select 
                className="bg-transparent border-none focus:ring-0 text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            
            <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2">
              <MapPin size={16} className="text-gray-400 mr-2" />
              <select 
                className="bg-transparent border-none focus:ring-0 text-sm"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="all">All Locations</option>
                {parkingLocations.map(location => (
                  <option key={location.id} value={location.id}>{location.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spot</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Remaining</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSpots.map((spot) => {
                  const location = parkingLocations.find(loc => loc.id === spot.locationId);
                  
                  return (
                    <tr key={spot.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 flex items-center">
                          {spot.zone} - #{spot.spotNumber}
                          {spot.isAccessible && (
                            <span className="ml-2 text-blue-500 text-lg">♿</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{location?.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(spot.status)}`}>
                          {spot.status.charAt(0).toUpperCase() + spot.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{spot.userName || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          {spot.status === 'occupied' ? (
                            <>
                              <Clock size={14} className="mr-1 text-gray-400" />
                              {getTimeRemaining(spot.occupiedUntil)}
                            </>
                          ) : (
                            '-'
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${spot.price.toFixed(2)}/hr</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-500 hover:text-blue-700 mr-3">
                          <Edit size={16} />
                        </button>
                        {spot.status === 'occupied' && (
                          <button className="text-red-500 hover:text-red-700">
                            End Session
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingSpots;

import { MapPin } from 'lucide-react';