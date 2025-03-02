import React from 'react';
import { Link } from 'react-router-dom';
import { Car, MapPin, Clock, ChevronRight } from 'lucide-react';

const HomePage: React.FC = () => {
  // Mock active parking session
  const activeSession = {
    id: '156',
    zone: 'B-12',
    location: 'Kingston',
    startTime: '10:02 PM',
    endTime: '12:20 AM',
    date: 'Jan 29, 2025',
  };

  // Mock recent locations
  const recentLocations = [
    { id: 1, name: 'Downtown Parking', address: '123 Main St, Kingston' },
    { id: 2, name: 'Waterfront Garage', address: '456 Harbor Dr, Kingston' },
    { id: 3, name: 'City Center', address: '789 Center Ave, Kingston' },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hello, Mitchell</h1>
          <p className="text-gray-500">Find your perfect parking spot</p>
        </div>
        <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-gray-700">MW</span>
        </div>
      </div>

      {/* Active Parking Session */}
      {activeSession && (
        <Link to={`/parking-details/${activeSession.id}`} className="block mb-6">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Active Parking</h2>
                  <p className="text-sm text-white/80">Zone {activeSession.zone}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-white/80" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-white/80" />
                <span className="text-sm">{activeSession.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-white/80" />
                <span className="text-sm">{activeSession.startTime} - {activeSession.endTime}</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/find-parking" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="font-medium text-gray-900">Find Parking</span>
          </Link>
          <Link to="/history" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="font-medium text-gray-900">History</span>
          </Link>
        </div>
      </div>

      {/* Recent Locations */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Recent Locations</h2>
        <div className="space-y-3">
          {recentLocations.map(location => (
            <Link 
              key={location.id} 
              to={`/find-parking?location=${encodeURIComponent(location.name)}`}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{location.name}</p>
                  <p className="text-sm text-gray-500">{location.address}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;