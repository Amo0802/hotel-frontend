// src/pages/Amenities.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import FloatingLanguageSelector from '../components/common/FloatingLanguageSelector';
import '../styles/pages/Amenities.css';

interface Amenity {
  id: string;
  title: string;
  description: string;
  hours: string;
  location: string;
  actionText: string;
  image: string;
}

const Amenities: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const amenities: Amenity[] = [
    {
      id: 'spa',
      title: t('amenities.spa'),
      description: t('amenities.spaDesc'),
      hours: '9:00 AM - 8:00 PM',
      location: t('amenities.floors.level3'),
      actionText: t('amenities.bookSession'),
      image: '/assets/spa.jpg'
    },
    {
      id: 'pool',
      title: t('amenities.pool'),
      description: t('amenities.poolDesc'),
      hours: '7:00 AM - 10:00 PM',
      location: t('amenities.floors.level5'),
      actionText: t('amenities.reserveTime'),
      image: '/assets/pool.jpg'
    },
    {
      id: 'gym',
      title: t('amenities.gym'),
      description: t('amenities.gymDesc'),
      hours: '24 Hours',
      location: t('amenities.floors.level2'),
      actionText: t('amenities.bookTrainer'),
      image: '/assets/gym.jpg'
    },
    {
      id: 'business-center',
      title: t('amenities.business'),
      description: t('amenities.businessDesc'),
      hours: '8:00 AM - 8:00 PM',
      location: t('amenities.floors.level1'),
      actionText: t('amenities.bookRoom'),
      image: '/assets/business.jpg'
    }
  ];

  const handleAmenityAction = (amenityId: string): void => {
    switch (amenityId) {
      case 'spa':
        alert('Booking a spa session');
        break;
      case 'pool':
        alert('Reserving pool time');
        break;
      case 'gym':
        alert('Booking a trainer');
        break;
      case 'business-center':
        alert('Booking a meeting room');
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
        <h1 className="heading-primary">{t('amenities.title')}</h1>
        <p className="help-text text-center">{t('amenities.explore')}</p>
      </div>
      
      <div className="amenities-grid">
        {amenities.map(amenity => (
          <div className="amenity-card" id={amenity.id} key={amenity.id}>
            <img src="/api/placeholder/400/200" alt={amenity.title} className="amenity-image" />
            <div className="amenity-content">
              <h2 className="amenity-title">{amenity.title}</h2>
              <p className="amenity-description">{amenity.description}</p>
              <div className="amenity-details">
                <div className="detail-item">
                  <div className="detail-icon">🕒</div>
                  <div className="detail-text">{amenity.hours}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon">📍</div>
                  <div className="detail-text">{amenity.location}</div>
                </div>
              </div>
              <Button 
                className="amenity-btn" 
                onClick={() => handleAmenityAction(amenity.id)}
              >
                {amenity.actionText}
              </Button>
            </div>
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

export default Amenities;