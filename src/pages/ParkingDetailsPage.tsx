import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Download, MapPin, Clock, Calendar, CreditCard } from 'lucide-react';

const ParkingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Define parking spots data with availability status
  const parkingSpots = [
    { id: 1, isAccessible: true, isTaken: false },
    { id: 2, isAccessible: true, isTaken: true },
    { id: 3, isAccessible: false, isTaken: false },
    { id: 4, isAccessible: false, isTaken: true },
    { id: 5, isAccessible: false, isTaken: false },
    { id: 6, isAccessible: false, isTaken: true },
    { id: 7, isAccessible: false, isTaken: false },
    { id: 8, isAccessible: false, isTaken: false },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-gray-100">
        <button 
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Parking Details</h1>
        <button className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 transition-colors">
          <Download className="h-5 w-5" />
          <span className="text-sm font-medium">Receipt</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {/* Parking Status */}
        <div className="mb-5">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl font-bold">P</span>
                </div>
                <div>
                  <h2 className="font-bold text-lg">Zone B-12</h2>
                  <p className="text-sm text-white/80">Spot #{id}</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-full px-3 py-1">
                <span className="text-sm font-medium">Active</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {parkingSpots.map((spot) => (
                <div
                  key={spot.id}
                  className={`h-6 rounded-full ${
                    spot.isTaken 
                      ? "bg-red-400/50" 
                      : "bg-green-400/50"
                  } ${spot.isAccessible ? "flex items-center justify-center" : ""}`}
                >
                  {spot.isAccessible && <span className="text-xs">♿️</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time Details */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Parking Duration</h2>
          <div className="bg-gray-50 rounded-2xl p-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-bold text-gray-900">Kingston</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-bold text-gray-900">Jan 29, 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Time</p>
                  <p className="font-bold text-gray-900">10:02 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Time</p>
                  <p className="font-bold text-gray-900">12:20 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Activity Log</h2>
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-base font-bold text-gray-900">10:02 PM</span>
                <span className="text-sm text-gray-400">Jan 29, 2025</span>
              </div>
              <p className="text-sm text-gray-600">Parking session started</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-base font-bold text-gray-900">12:20 AM</span>
                <span className="text-sm text-gray-400">Jan 29, 2025</span>
              </div>
              <p className="text-sm text-gray-600">Payment processed successfully</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Footer */}
      <div className="border-t border-gray-100 p-5 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
              <CreditCard className="h-6 w-6 text-gray-700" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">•••• 7215</div>
              <div className="text-xs text-gray-500">Mitchell Winter</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Total Amount</div>
            <div className="flex items-center gap-3">
              <div className="text-lg font-bold text-gray-900">CAD $14.00</div>
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingDetailsPage;