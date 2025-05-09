export interface User {
  id: string;
  name: string;
  email: string;
  roomNumber?: string;
  checkInDate?: string;
  checkOutDate?: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isCheckedIn: boolean;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  currentLanguage: string;
  dndActive: boolean;
  activeRequests: {
    cleaning: CleaningRequest | null;
    maintenance: MaintenanceRequest | null;
  };
}

export interface CleaningRequest {
  id: string;
  status: string;
  requested: string;
  type: string;
  eta?: string;
}

export interface MaintenanceRequest {
  id: string;
  status: string;
  requested: string;
  issue: string;
  priority: 'low' | 'medium' | 'high';
  eta?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  dietaryInfo?: string[];
}

export interface MenuCategory {
  availableTime: string;
  items: MenuItem[];
}

export interface Menu {
  [category: string]: MenuCategory;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}