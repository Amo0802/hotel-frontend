// API service for room service and food orders
import { get, post } from './apiClient';
import { Menu, MenuItem, ApiResponse } from '../types';

export const getRoomServiceMenu = async (): Promise<Menu> => {
  try {
    const response = await get<Menu>('/food/room-service-menu');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch menu');
    }
    return response.data;
  } catch (error) {
    console.error('Failed to fetch room service menu:', error);
    throw error;
  }
};

interface OrderData {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  specialInstructions?: string;
  roomNumber?: string;
}

interface OrderResponse {
  orderId: string;
  estimatedDelivery: string;
}

export const placeRoomServiceOrder = async (orderData: OrderData): Promise<ApiResponse<OrderResponse>> => {
  try {
    return await post<OrderResponse>('/food/room-service/order', orderData);
  } catch (error) {
    console.error('Failed to place room service order:', error);
    throw error;
  }
};

export const getRestaurantMenu = async (): Promise<Menu> => {
  try {
    const response = await get<Menu>('/food/restaurant-menu');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch restaurant menu');
    }
    return response.data;
  } catch (error) {
    console.error('Failed to fetch restaurant menu:', error);
    throw error;
  }
};

interface ReservationData {
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

interface ReservationResponse {
  reservationId: string;
  confirmed: boolean;
}

export const makeReservation = async (reservationData: ReservationData): Promise<ApiResponse<ReservationResponse>> => {
  try {
    return await post<ReservationResponse>('/food/reservation', reservationData);
  } catch (error) {
    console.error('Failed to make reservation:', error);
    throw error;
  }
};