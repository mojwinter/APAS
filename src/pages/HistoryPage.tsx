import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ChevronRight } from 'lucide-react';

const HistoryPage: React.FC = () => {
  // Mock parking history
  const parkingHistory = [
    {
      id: '156',
      zone: 'B-12',
      location: 'Downtown Parking',
      address: '123 Main St, Kingston',
      startTime: '10:02 PM',
      endTime: '12:20 AM',
      date: 'Jan 29, 2025',
      amount: 'CAD $14.00',
      status: 'Completed'
    },
    {
      id: '143',
      zone: 'A-05',
      location: 'Waterfront Garage',
      address: '456 Harbor Dr, Kingston',
      startTime: '2:15 PM',
      endTime: '5:30 PM',
      date: 'Jan 25, 2025',
      amount: 'CAD $9.75',
      status: 'Completed'
    },
    {
      id: '128',
      zone: 'C-22',
      location: 'City Center',
      address: '789 Center Ave, Kingston',
      startTime: '9:00 AM',
      endTime: '11:45 AM',
      date: 'Jan 20, 2025',
      amount: 'CAD $5.50',
      status: 'Completed'
    },
    {
      id: '112',
      zone: 'D-08',
      location: 'University Parking',
      address: '101 College Rd, Kingston',
      startTime: '1:30 PM',
      endTime: '4:00 PM',
      date: 'Jan 15, 2025',
      amount: 'CAD $3.75',
      status: 'Completed'
    }
  ];

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-gray-900 mb-5">Parking History</h1>
      
      <div className="space-y-4">
        {parkingHistory.map(session => (
          <Link 
            key={session.id} 
            to={`/parking-details/${session.id}`}
            className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-900">{session.location}</h3>
                <p className="text-sm text-gray-500">{session.address}</p>
              </div>
              <div className="bg-gray-100 rounded-lg px-2 py-1">
                <span className="text-xs font-medium text-gray-700">{session.status}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{session.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{session.startTime} - {session.endTime}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-xs font-bold text-emerald-600">P</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Zone {session.zone}</p>
                  <p className="text-sm font-medium text-gray-900">Spot #{session.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">{session.amount}</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;