import type React from "react"
import { CreditCard, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react"

const ProfilePage: React.FC = () => {
  // Mock user data
  const user = {
    name: "Mitchell Winter",
    email: "mitchell.winter@queensu.ca",
    phone: "+1 (778) 989-7215",
    profileImage: null, // No image, will use initials
  }

  // Mock payment methods
  const paymentMethods = [
    { id: 1, type: "Visa", last4: "7215", expiry: "05/26", isDefault: true },
    { id: 2, type: "Mastercard", last4: "8432", expiry: "11/25", isDefault: false },
  ]

  // Profile menu items
  const menuItems = [
    { id: "notifications", icon: <Bell className="h-5 w-5" />, label: "Notifications", badge: "2" },
    { id: "security", icon: <Shield className="h-5 w-5" />, label: "Security & Privacy" },
    { id: "help", icon: <HelpCircle className="h-5 w-5" />, label: "Help & Support" },
    { id: "logout", icon: <LogOut className="h-5 w-5" />, label: "Log Out", danger: true },
  ]

  return (
      <div className="page-container">
        <h1 className="text-2xl font-bold text-gray-900 mb-5">Profile</h1>

        {/* User Info */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-emerald-700">
              {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
            </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">{user.phone}</p>
            </div>
          </div>
          <button className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            Edit Profile
          </button>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-gray-900">Payment Methods</h2>
            <button className="text-sm font-medium text-emerald-600">+ Add New</button>
          </div>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
                <div
                    key={method.id}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {method.type} •••• {method.last4}
                        {method.isDefault && (
                            <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                        Default
                      </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Settings</h2>
          <div className="space-y-3">
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div
                        className={`h-10 w-10 rounded-full ${item.danger ? "bg-red-100" : "bg-gray-100"} flex items-center justify-center`}
                    >
                      <span className={item.danger ? "text-red-600" : "text-gray-600"}>{item.icon}</span>
                    </div>
                    <span className={`font-medium ${item.danger ? "text-red-600" : "text-gray-900"}`}>{item.label}</span>
                  </div>
                  <div className="flex items-center">
                    {item.badge && (
                        <span className="mr-2 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs">
                    {item.badge}
                  </span>
                    )}
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </button>
            ))}
          </div>
        </div>
      </div>
  )
}

export default ProfilePage

