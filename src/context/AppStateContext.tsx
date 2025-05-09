import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, CleaningRequest, MaintenanceRequest } from '../types';

interface AppStateContextType extends AppState {
  setCurrentLanguage: (language: string) => void;
  toggleDnd: () => void;
  addActiveRequest: (type: 'cleaning' | 'maintenance', request: CleaningRequest | MaintenanceRequest) => void;
  removeActiveRequest: (type: 'cleaning' | 'maintenance') => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>({
    currentLanguage: 'en',
    dndActive: false,
    activeRequests: {
      cleaning: null,
      maintenance: null,
    },
  });

  const setCurrentLanguage = (language: string): void => {
    setAppState(prev => ({ ...prev, currentLanguage: language }));
  };

  const toggleDnd = (): void => {
    setAppState(prev => ({ ...prev, dndActive: !prev.dndActive }));
  };

  const addActiveRequest = (
    type: 'cleaning' | 'maintenance', 
    request: CleaningRequest | MaintenanceRequest
  ): void => {
    setAppState(prev => ({
      ...prev,
      activeRequests: {
        ...prev.activeRequests,
        [type]: request,
      },
    }));
  };

  const removeActiveRequest = (type: 'cleaning' | 'maintenance'): void => {
    setAppState(prev => ({
      ...prev,
      activeRequests: {
        ...prev.activeRequests,
        [type]: null,
      },
    }));
  };

  const value: AppStateContextType = {
    ...appState,
    setCurrentLanguage,
    toggleDnd,
    addActiveRequest,
    removeActiveRequest,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};