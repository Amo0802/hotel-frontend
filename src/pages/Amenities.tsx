import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
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
  const navigate = useNavigate();

  const amenities: Amenity[] = [
    {
      id: 'spa',
      title: 'Spa & Wellness',
      description: 'Indulge in relaxing treatments and massages',
      hours: '9:00 AM - 8:00 PM',
      location: 'Level 3',
      actionText: 'Book a Session',
      image: '/assets/spa.jpg'
    },
    {
      id: 'pool',
      title: 'Swimming Pool',
      description: 'Enjoy our heated indoor and outdoor pools',
      hours: '7:00 AM - 10:00 PM',
      location: 'Level 5',
      actionText: 'Reserve Time Slot',
      image: '/assets/pool.jpg'
    },
    {
      id: 'gym',
      title: 'Fitness Center',
      description: 'State-of-the-art equipment and personal trainers',
      hours: '24 Hours',
      location: 'Level 2',
      actionText: 'Book a Trainer',
      image: '/assets/gym.jpg'
    },
    {
      id: 'business-center',
      title: 'Business Center',
      description: 'Meeting rooms and business services',
      hours: '8:00 AM - 8:00 PM',
      location: 'Level 1',
      actionText: 'Book a Room',
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
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">Hotel Amenities</h1>
        <p className="help-text text-center">Explore our facilities and services</p>
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
        ← Back to Home
      </Button>
      
      <Footer />
    </div>
  );
};

export default Amenities;
