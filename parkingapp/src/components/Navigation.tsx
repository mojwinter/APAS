import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MapPin, Clock, User } from 'lucide-react';

const Navigation: React.FC = () => {
  return (
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 py-3 z-50">
        <nav className="flex justify-around items-center">
          <NavLink
              to="/"
              className={({ isActive }) =>
                  `flex flex-col items-center ${isActive ? 'text-emerald-600' : 'text-gray-500'}`
              }
              end
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </NavLink>

          <NavLink
              to="/find-parking"
              className={({ isActive }) =>
                  `flex flex-col items-center ${isActive ? 'text-emerald-600' : 'text-gray-500'}`
              }
          >
            <MapPin className="h-6 w-6" />
            <span className="text-xs mt-1">Find</span>
          </NavLink>

          <NavLink
              to="/history"
              className={({ isActive }) =>
                  `flex flex-col items-center ${isActive ? 'text-emerald-600' : 'text-gray-500'}`
              }
          >
            <Clock className="h-6 w-6" />
            <span className="text-xs mt-1">History</span>
          </NavLink>

          <NavLink
              to="/profile"
              className={({ isActive }) =>
                  `flex flex-col items-center ${isActive ? 'text-emerald-600' : 'text-gray-500'}`
              }
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </NavLink>
        </nav>
      </div>
  );
};

export default Navigation;
