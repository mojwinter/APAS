import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ChevronRight } from 'lucide-react';
import { useParkingContext } from '../context/ParkingContext';

const HistoryPage: React.FC = () => {
  const { parkingHistory } = useParkingContext();

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
                  <div className={`rounded-lg px-2 py-1 ${
                      session.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : session.status === 'Upcoming'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                  }`}>
                    <span className="text-xs font-medium">{session.status}</span>
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