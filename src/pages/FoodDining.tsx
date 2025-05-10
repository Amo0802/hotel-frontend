// src/pages/FoodDining.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import FloatingLanguageSelector from '../components/common/FloatingLanguageSelector';
import '../styles/pages/FoodDining.css';

interface ServiceOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  action: string;
}

const FoodDining: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const serviceOptions: ServiceOption[] = [
    {
      id: 'room-service',
      icon: '🛎️',
      title: t('foodDining.roomService'),
      description: t('foodDining.roomServiceDesc'),
      action: t('foodDining.selectRoomService')
    },
    {
      id: 'restaurant',
      icon: '🍽️',
      title: t('foodDining.restaurant'),
      description: t('foodDining.restaurantDesc'),
      action: t('foodDining.selectRestaurant')
    },
    {
      id: 'dining-reservation',
      icon: '📅',
      title: t('foodDining.diningReservations'),
      description: t('foodDining.diningReservationsDesc'),
      action: t('foodDining.makeReservation')
    }
  ];

  const handleOptionSelect = (optionId: string): void => {
    switch (optionId) {
      case 'room-service':
        navigate('/room-service');
        break;
      case 'restaurant':
        alert('Navigating to Restaurant menu');
        // navigate('/restaurant');
        break;
      case 'dining-reservation':
        alert('Navigating to Dining Reservations');
        // navigate('/dining-reservation');
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <FloatingLanguageSelector />
      
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">{t('foodDining.title')}</h1>
        <p className="help-text text-center">{t('foodDining.howEnjoyMeal')}</p>
      </div>
      
      {/* Status indicator for food orders */}
      <div className="status-indicator-box">
        <div className="status-indicator-title">{t('foodDining.currentOrders')}</div>
        <div className="status-item">
          <div className="status-icon food">🍽️</div>
          <div className="status-details">
            <h4>Breakfast - Room Service</h4>
            <p>Estimated delivery: 8:15 AM</p>
            <div className="status-progress">
              <div className="status-bar" style={{ width: '75%' }}></div>
            </div>
            <p className="status-label">{t('notifications.inProgress')}</p>
          </div>
        </div>
      </div>
      
      <div className="service-options">
        {serviceOptions.map((option) => (
          <div className="service-option" id={option.id} key={option.id}>
            <div className="service-icon">{option.icon}</div>
            <h2 className="service-title">{option.title}</h2>
            <p className="service-description">{option.description}</p>
            <Button onClick={() => handleOptionSelect(option.id)}>{option.action}</Button>
          </div>
        ))}
      </div>
      
      <Button variant="text" onClick={() => navigate('/home')}>
        ← {t('common.backHome')}
      </Button>
      
      <Footer />
    </div>
  );
};

export default FoodDining;