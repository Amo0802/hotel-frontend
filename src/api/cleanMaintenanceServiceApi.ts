// API service for housekeeping and maintenance
import { get, post } from './apiClient';
import { CleaningRequest, MaintenanceRequest, ApiResponse } from '../types';

interface CleaningRequestData {
  cleaningType: string;
  cleaningTime: string;
  cleaningNotes?: string;
  notPresent: boolean;
}

export const requestCleaning = async (cleaningData: CleaningRequestData): Promise<ApiResponse<CleaningRequest>> => {
  try {
    return await post<CleaningRequest>('/room/cleaning', cleaningData);
  } catch (error) {
    console.error('Failed to request cleaning:', error);
    throw error;
  }
};

interface MaintenanceRequestData {
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  notPresent: boolean;
  contactMethod: string;
}

export const requestMaintenance = async (maintenanceData: MaintenanceRequestData): Promise<ApiResponse<MaintenanceRequest>> => {
  try {
    return await post<MaintenanceRequest>('/room/maintenance', maintenanceData);
  } catch (error) {
    console.error('Failed to request maintenance:', error);
    throw error;
  }
};

interface CleaningSchedule {
  days: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  preferredTime?: string;
}

export const getCleaningSchedule = async (): Promise<ApiResponse<CleaningSchedule>> => {
  try {
    return await get<CleaningSchedule>('/room/cleaning/schedule');
  } catch (error) {
    console.error('Failed to fetch cleaning schedule:', error);
    throw error;
  }
};

export const updateCleaningSchedule = async (scheduleData: CleaningSchedule): Promise<ApiResponse<CleaningSchedule>> => {
  try {
    return await post<CleaningSchedule>('/room/cleaning/schedule', scheduleData);
  } catch (error) {
    console.error('Failed to update cleaning schedule:', error);
    throw error;
  }
};

export const toggleDnd = async (active: boolean): Promise<ApiResponse<{ active: boolean }>> => {
  try {
    return await post<{ active: boolean }>('/room/dnd', { active });
  } catch (error) {
    console.error('Failed to toggle DND status:', error);
    throw error;
  }
};