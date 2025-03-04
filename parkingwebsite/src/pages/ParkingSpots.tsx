import React, { useState } from 'react';
import Header from '../components/Header';
import { parkingSpots, parkingLocations } from '../data/mockData';
import { Car, Filter, Clock, Edit, AlertTriangle, Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ParkingSpots: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [showExpiredOnly, setShowExpiredOnly] = useState(false);

  const isExpired = (endTime?: string) => {
    if (!endTime) return false;
    return new Date(endTime) < new Date();
  };

  const filteredSpots = parkingSpots.filter(spot => {
    // First check expired filter
    if (showExpiredOnly && (!spot.occupiedUntil || !isExpired(spot.occupiedUntil))) {
      return false;
    }

    // Then check other filters
    if (filter !== 'all' && spot.status !== filter) return false;
    if (locationFilter !== 'all' && spot.locationId !== locationFilter) return false;
    return true;
  });

  const getStatusBadgeClass = (status: string, endTime?: string) => {
    if (status === 'occupied' && isExpired(endTime)) {
      return 'bg-orange-100 text-orange-800';
    }

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
      const duration = formatDistanceToNow(end, { addSuffix: true });
      return (
          <span className="flex items-center text-orange-600 font-medium">
          <AlertTriangle size={14} className="mr-1" />
          Expired {duration}
        </span>
      );
    }

    return formatDistanceToNow(end, { addSuffix: true });
  };

  // Count expired sessions
  const expiredCount = parkingSpots.filter(spot =>
      spot.status === 'occupied' && spot.occupiedUntil && isExpired(spot.occupiedUntil)
  ).length;

  const handleNotifyAll = () => {
    // In a real app, this would send notifications to all expired spots
    alert(`Notifications sent to ${expiredCount} expired spots`);
  };

  return (
      <div className="flex-1 bg-gray-100 overflow-auto">
        <Header title="Parking Spots" />

        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-xl font-semibold flex items-center">
                <Car size={20} className="mr-2 text-blue-500" />
                All Parking Spots
              </h2>
              {expiredCount > 0 && (
                  <div className="mt-2 flex items-center space-x-4">
                    <p className="text-orange-600 flex items-center">
                      <AlertTriangle size={16} className="mr-1" />
                      {expiredCount} spot{expiredCount !== 1 ? 's' : ''} with expired parking
                    </p>
                    <button
                        onClick={handleNotifyAll}
                        className="text-orange-600 hover:text-orange-700 flex items-center text-sm font-medium"
                    >
                      <Bell size={14} className="mr-1" />
                      Notify All
                    </button>
                  </div>
              )}
            </div>

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

              <button
                  onClick={() => setShowExpiredOnly(!showExpiredOnly)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                      showExpiredOnly
                          ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <AlertTriangle size={16} className="mr-2" />
                {showExpiredOnly ? 'Show All' : 'Show Expired Only'}
              </button>
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
                  const expired = spot.status === 'occupied' && spot.occupiedUntil && isExpired(spot.occupiedUntil);

                  return (
                      <tr key={spot.id} className={`hover:bg-gray-50 ${expired ? 'bg-orange-50' : ''}`}>
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
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(spot.status, spot.occupiedUntil)}`}>
                          {spot.status.charAt(0).toUpperCase() + spot.status.slice(1)}
                          {expired && ' (Expired)'}
                        </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{spot.userName || '-'}</div>
                          {expired && spot.userName && (
                              <div className="text-xs text-gray-500">{spot.userVehicle || 'No vehicle info'}</div>
                          )}
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
                          <div className="flex items-center space-x-3">
                            <button className="text-blue-500 hover:text-blue-700">
                              <Edit size={16} />
                            </button>
                            {spot.status === 'occupied' && (
                                <button
                                    className={`${
                                        expired
                                            ? 'text-orange-500 hover:text-orange-700'
                                            : 'text-red-500 hover:text-red-700'
                                    } whitespace-nowrap`}
                                >
                                  {expired ? (
                                      <span className="flex items-center">
                                  <Bell size={14} className="mr-1" />
                                  Send Warning
                                </span>
                                  ) : 'End Session'}
                                </button>
                            )}
                          </div>
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