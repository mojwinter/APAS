import React, { useState } from 'react';
import Header from '../components/Header';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { parkingLocations, parkingSessions, parkingSpots } from '../data/mockData';
import { Calendar, Download, BarChart2 } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Calculate revenue by location
  const revenueByLocation = parkingLocations.map(location => {
    const locationSessions = parkingSessions.filter(
      session => session.locationId === location.id && session.paymentStatus === 'paid'
    );
    const revenue = locationSessions.reduce((sum, session) => sum + session.amount, 0);
    
    return {
      name: location.name,
      revenue
    };
  });
  
  // Calculate occupancy by hour
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const occupancyByHour = hours.map(hour => {
    // Calculation is just for show really... lol
    const baseOccupancy = 30; // base occupancy percentage
    let modifier = 0;
    
    // Simulate higher occupancy during business hours and rush hours
    if (hour >= 7 && hour <= 9) modifier = 40; // morning rush
    else if (hour >= 11 && hour <= 14) modifier = 30; // lunch time
    else if (hour >= 16 && hour <= 19) modifier = 45; // evening rush
    else if (hour >= 22 || hour <= 5) modifier = -20; // night time
    
    return {
      hour: `${hour.toString().padStart(2, '0')}:00`,
      occupancy: Math.min(100, Math.max(10, baseOccupancy + modifier + Math.floor(Math.random() * 15)))
    };
  });
  
  // Calculate spot status distribution
  const spotStatusCounts = {
    available: parkingSpots.filter(spot => spot.status === 'available').length,
    occupied: parkingSpots.filter(spot => spot.status === 'occupied').length,
    reserved: parkingSpots.filter(spot => spot.status === 'reserved').length,
    maintenance: parkingSpots.filter(spot => spot.status === 'maintenance').length
  };
  
  const spotStatusData = [
    { name: 'Available', value: spotStatusCounts.available, color: '#10B981' },
    { name: 'Occupied', value: spotStatusCounts.occupied, color: '#EF4444' },
    { name: 'Reserved', value: spotStatusCounts.reserved, color: '#F59E0B' },
    { name: 'Maintenance', value: spotStatusCounts.maintenance, color: '#6B7280' }
  ];
  
  // Calculate average parking duration
  const parkingDurations = parkingSessions.map(session => {
    const startTime = new Date(session.startTime);
    const endTime = new Date(session.endTime);
    const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    
    return {
      location: session.locationName,
      duration: durationHours
    };
  });
  
  const averageDurationByLocation = parkingLocations.map(location => {
    const locationDurations = parkingDurations.filter(d => d.location === location.name);
    const totalDuration = locationDurations.reduce((sum, d) => sum + d.duration, 0);
    const averageDuration = locationDurations.length > 0 ? totalDuration / locationDurations.length : 0;
    
    return {
      name: location.name,
      duration: parseFloat(averageDuration.toFixed(2))
    };
  });

  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
      <Header title="Analytics" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <BarChart2 size={20} className="mr-2 text-blue-500" />
            Parking Analytics
          </h2>
          
          <div className="flex space-x-2">
            <div className="flex items-center bg-white rounded-lg shadow-sm px-3 py-2">
              <Calendar size={16} className="text-gray-400 mr-2" />
              <select 
                className="bg-transparent border-none focus:ring-0 text-sm"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <button className="flex items-center bg-blue-500 text-white rounded-lg px-3 py-2 hover:bg-blue-600">
              <Download size={16} className="mr-2" />
              Export Report
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue by Location</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueByLocation}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Occupancy by Hour</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={occupancyByHour}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Occupancy Rate']} />
                  <Line 
                    type="monotone" 
                    dataKey="occupancy" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Spot Status Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spotStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {spotStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Spots']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Average Parking Duration by Location</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={averageDurationByLocation}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} hours`, 'Average Duration']} />
                  <Bar dataKey="duration" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Average Revenue per Spot</p>
              <p className="text-2xl font-bold mt-2">
                ${(parkingSessions.reduce((sum, session) => sum + session.amount, 0) / parkingSpots.length).toFixed(2)}
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Average Occupancy Rate</p>
              <p className="text-2xl font-bold mt-2">
                {Math.round((parkingSpots.filter(spot => spot.status === 'occupied').length / parkingSpots.length) * 100)}%
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Peak Occupancy Time</p>
              <p className="text-2xl font-bold mt-2">17:00 - 19:00</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Most Popular Location</p>
              <p className="text-2xl font-bold mt-2">Downtown</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;