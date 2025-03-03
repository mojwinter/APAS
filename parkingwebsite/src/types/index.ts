export interface ParkingLocation {
  id: string;
  name: string;
  address: string;
  totalSpots: number;
  availableSpots: number;
  pricePerHour: number;
  rating: number;
  distance?: string;
  image?: string;
}

export interface ParkingSpot {
  id: string;
  locationId: string;
  spotNumber: string;
  zone: string;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  occupiedSince?: string;
  occupiedUntil?: string;
  userId?: string;
  userName?: string;
  userVehicle?: string;
  price: number;
  isAccessible?: boolean;
}

export interface ParkingSession {
  id: string;
  userId: string;
  userName: string;
  locationId: string;
  locationName: string;
  spotId: string;
  spotNumber: string;
  zone: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'completed' | 'cancelled';
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  paymentMethod?: string;
}

export interface RevenueData {
  date: string;
  amount: number;
}

export interface OccupancyData {
  time: string;
  occupancyRate: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalSessions: number;
  totalSpent: number;
  joinDate: string;
  lastActive: string;
}