import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star } from 'lucide-react';

const FindParkingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock parking locations
  const parkingLocations = [
    {
      id: 1,
      name: 'Downtown Parking',
      address: '123 Main St, Kingston',
      distance: '0.3 km',
      rating: 4.8,
      price: '$2.50/hr',
      availableSpots: 12,
      image: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'Waterfront Garage',
      address: '456 Harbor Dr, Kingston',
      distance: '0.7 km',
      rating: 4.5,
      price: '$3.00/hr',
      availableSpots: 5,
      image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      name: 'City Center',
      address: '789 Center Ave, Kingston',
      distance: '1.2 km',
      rating: 4.2,
      price: '$2.00/hr',
      availableSpots: 20,
      image: 'https://images.unsplash.com/photo-1590674899484-13d6c7094a9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      name: 'University Parking',
      address: '101 College Rd, Kingston',
      distance: '1.5 km',
      rating: 4.0,
      price: '$1.50/hr',
      availableSpots: 8,
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
    }
  ];

  const filteredLocations = parkingLocations.filter(location => 
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-gray-900 mb-5">Find Parking</h1>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Search for parking locations"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Parking Locations */}
      <div className="space-y-4">
        {filteredLocations.map(location => (
          <div key={location.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-40 w-full relative">
              <img 
                src={location.image} 
                alt={location.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white rounded-lg px-2 py-1 flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{location.rating}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900">{location.name}</h3>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{location.address}</span>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="font-medium text-gray-900">{location.price}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Distance</div>
                  <div className="font-medium text-gray-900">{location.distance}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Available</div>
                  <div className="font-medium text-gray-900">{location.availableSpots} spots</div>
                </div>
              </div>
              <Link 
                to={`/book-parking/${location.id}`}
                className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Reserve Spot
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindParkingPage;