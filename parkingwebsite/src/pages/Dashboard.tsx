import React from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import ActiveSessionsTable from '../components/ActiveSessionsTable';
import RevenueChart from '../components/RevenueChart';
import OccupancyChart from '../components/OccupancyChart';
import LocationsTable from '../components/LocationsTable';
import { 
  DollarSign, 
  Clock, 
  Car, 
  Percent 
} from 'lucide-react';
import { 
  parkingLocations, 
  parkingSessions, 
  revenueData, 
  occupancyData,
  currentStats
} from '../data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
      <Header title="Dashboard" />
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            title="Total Revenue" 
            value={`$${currentStats.totalRevenue.toFixed(2)}`} 
            icon={<DollarSign size={20} />} 
            change="12% from last month" 
            changeType="positive"
            bgColor="bg-green-500"
          />
          <StatCard 
            title="Active Sessions" 
            value={currentStats.activeSessionsCount} 
            icon={<Clock size={20} />} 
            change="5 more than yesterday" 
            changeType="positive"
            bgColor="bg-blue-500"
          />
          <StatCard 
            title="Occupied Spots" 
            value={`${currentStats.occupiedSpotsCount}/${currentStats.totalSpotsCount}`} 
            icon={<Car size={20} />} 
            change="3 more than average" 
            changeType="neutral"
            bgColor="bg-purple-500"
          />
          <StatCard 
            title="Occupancy Rate" 
            value={`${currentStats.occupancyRate}%`} 
            icon={<Percent size={20} />} 
            change="5% increase" 
            changeType="positive"
            bgColor="bg-orange-500"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RevenueChart data={revenueData} />
          <OccupancyChart data={occupancyData} />
        </div>
        
        <div className="mb-6">
          <ActiveSessionsTable sessions={parkingSessions} />
        </div>
        
        <div className="mb-6">
          <LocationsTable locations={parkingLocations} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;