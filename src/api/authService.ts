import { get, post } from './apiClient';
import { User, ApiResponse } from '../types';

interface LoginResponse {
  user: User;
  token: string;
  checkedIn: boolean;
}

export const loginUser = async (reservationCode: string): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await post<LoginResponse>('/auth/login', { code: reservationCode });
    
    // Store auth token if provided
    if (response.success && response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

interface CheckInData {
  phone: string;
  idType: string;
  idNumber: string;
  arrivalTime: string;
  specialRequests?: string;
}

export const checkInUser = async (formData: CheckInData): Promise<ApiResponse<User>> => {
  try {
    return await post<User>('/checkin', formData);
  } catch (error) {
    console.error('Check-in failed:', error);
    throw error;
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem('authToken');
  // Additional cleanup if needed
};