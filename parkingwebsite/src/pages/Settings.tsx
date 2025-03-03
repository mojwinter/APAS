import React from 'react';
import Header from '../components/Header';
import { Settings as SettingsIcon, Save, CreditCard, Bell, Lock, Globe, Database } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
      <Header title="Settings" />
      
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <SettingsIcon size={20} className="mr-2 text-blue-500" />
            System Settings
          </h2>
          <p className="text-gray-500 mt-1">Manage your parking system configuration</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button className="text-blue-500 border-b-2 border-blue-500 py-4 px-6 font-medium">
                General
              </button>
              <button className="text-gray-500 hover:text-gray-700 py-4 px-6 font-medium">
                Notifications
              </button>
              <button className="text-gray-500 hover:text-gray-700 py-4 px-6 font-medium">
                Security
              </button>
              <button className="text-gray-500 hover:text-gray-700 py-4 px-6 font-medium">
                Payments
              </button>
              <button className="text-gray-500 hover:text-gray-700 py-4 px-6 font-medium">
                API
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">System Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      System Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="APAS Dashboard"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="mitchell.winter@queensu.ca"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time Zone
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                      <option>UTC</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Parking Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Booking Duration (hours)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booking Buffer Time (minutes)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="15"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="allow-extensions"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="allow-extensions" className="ml-2 block text-sm text-gray-900">
                      Allow parking extensions
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="send-reminders"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="send-reminders" className="ml-2 block text-sm text-gray-900">
                      Send expiration reminders
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Integration Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <CreditCard className="text-blue-500 mr-2" size={20} />
                    <h4 className="font-medium">Payment Gateway</h4>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Configure your payment processor integration</p>
                  <button className="text-blue-500 text-sm font-medium">Configure</button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Bell className="text-blue-500 mr-2" size={20} />
                    <h4 className="font-medium">Notification Service</h4>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Set up SMS and email notification services</p>
                  <button className="text-blue-500 text-sm font-medium">Configure</button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Database className="text-blue-500 mr-2" size={20} />
                    <h4 className="font-medium">Data Backup</h4>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Configure automatic data backup schedule</p>
                  <button className="text-blue-500 text-sm font-medium">Configure</button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-2">
                Cancel
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                <Save size={18} className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;