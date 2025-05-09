import React, { createContext, useContext, useState, ReactNode } from 'react';
import { loginUser } from '../api/authApi';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (reservationCode: string) => Promise<{ success: boolean; message?: string }>;
  completeCheckIn: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoggedIn: false,
    isCheckedIn: false,
    loading: false,
    error: null,
  });

  const login = async (reservationCode: string): Promise<{ success: boolean; message?: string }> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await loginUser(reservationCode);
      
      if (response.success && response.data) {
        setAuthState({
          user: response.data.user,
          isLoggedIn: true,
          isCheckedIn: response.data.checkedIn || false,
          loading: false,
          error: null,
        });
        return { success: true };
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: response.message || 'Invalid reservation code',
        }));
        return { success: false, message: response.message };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, message: errorMessage };
    }
  };

  const completeCheckIn = (): void => {
    setAuthState(prev => ({ ...prev, isCheckedIn: true }));
  };

  const logout = (): void => {
    setAuthState({
      user: null,
      isLoggedIn: false,
      isCheckedIn: false,
      loading: false,
      error: null,
    });
  };

  const value: AuthContextType = {
    ...authState,
    login,
    completeCheckIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
