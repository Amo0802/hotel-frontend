import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import '../styles/pages/FoodDining.css';

interface ServiceOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  action: string;
}

const FoodDining: React.FC = () => {
  const navigate = useNavigate();

  const serviceOptions: ServiceOption[] = [
    {
      id: 'room-service',
      icon: '🛎️',
      title: 'Room Service',
      description: 'Enjoy a delicious meal in the comfort of your room',
      action: 'Select Room Service'
    },
    {
      id: 'restaurant',
      icon: '🍽️',
      title: 'Restaurant',
      description: 'Order for dine-in at our restaurant',
      action: 'Select Restaurant'
    },
    {
      id: 'dining-reservation',
      icon: '📅',
      title: 'Dining Reservations',
      description: 'Make a reservation for breakfast, lunch or dinner',
      action: 'Make Reservation'
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
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">Food & Dining</h1>
        <p className="help-text text-center">How would you like to enjoy your meal?</p>
      </div>
      
      {/* Status indicator for food orders */}
      <div className="status-indicator-box">
        <div className="status-indicator-title">Your Current Orders</div>
        <div className="status-item">
          <div className="status-icon food">🍽️</div>
          <div className="status-details">
            <h4>Breakfast - Room Service</h4>
            <p>Estimated delivery: 8:15 AM</p>
            <div className="status-progress">
              <div className="status-bar" style={{ width: '75%' }}></div>
            </div>
            <p className="status-label">Preparing your order</p>
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
        ← Back to Home
      </Button>
      
      <Footer />
    </div>
  );
};

export default FoodDining;