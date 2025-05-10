// src/pages/LocalAttractions.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import FloatingLanguageSelector from '../components/common/FloatingLanguageSelector';
import '../styles/pages/LocalAttractions.css';

interface Attraction {
  id: string;
  title: string;
  description: string;
  distance: string;
  rating: number;
  reviewCount: number;
  actions: { text: string; primary: boolean }[];
  category: string;
  image: string;
}

interface TransportOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  action: string;
}

const LocalAttractions: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [distanceFilter, setDistanceFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const attractions: Attraction[] = [
    {
      id: 'city-museum',
      title: 'City Museum',
      description: 'Explore the city\'s rich history through interactive exhibits and ancient artifacts.',
      distance: '1.5 km',
      rating: 4,
      reviewCount: 238,
      actions: [
        { text: t('localAttractions.getDirections'), primary: true },
        { text: 'Book Tickets', primary: false }
      ],
      category: 'museums',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'central-park',
      title: 'Central Park',
      description: 'Relax in this beautiful urban oasis with walking paths, gardens, and seasonal events.',
      distance: '0.8 km',
      rating: 5,
      reviewCount: 412,
      actions: [
        { text: t('localAttractions.getDirections'), primary: true }
      ],
      category: 'parks',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'luxury-mall',
      title: 'Luxury Mall',
      description: 'Shop the latest fashion, electronics, and luxury goods at this premium shopping destination.',
      distance: '2.3 km',
      rating: 4,
      reviewCount: 178,
      actions: [
        { text: t('localAttractions.getDirections'), primary: true },
        { text: 'View Store List', primary: false }
      ],
      category: 'shopping',
      image: '/api/placeholder/400/200'
    }
  ];

  const transportOptions: TransportOption[] = [
    {
      id: 'taxi',
      icon: '🚕',
      title: t('localAttractions.taxi'),
      description: t('localAttractions.taxiDesc'),
      action: t('localAttractions.bookNow')
    },
    {
      id: 'car-rental',
      icon: '🚗',
      title: t('localAttractions.carRental'),
      description: t('localAttractions.carRentalDesc'),
      action: t('localAttractions.viewOptions')
    },
    {
      id: 'public-transit',
      icon: '🚇',
      title: t('localAttractions.publicTransit'),
      description: t('localAttractions.publicTransitDesc'),
      action: t('localAttractions.viewRoutes')
    },
    {
      id: 'walking-tours',
      icon: '🚶',
      title: t('localAttractions.walkingTours'),
      description: t('localAttractions.walkingToursDesc'),
      action: t('localAttractions.bookTour')
    }
  ];

  const handleAttractionAction = (attractionId: string, action: string): void => {
    alert(`${action} for ${attractionId}`);
  };

  const handleTransportAction = (transportId: string): void => {
    alert(`Action for ${transportId}`);
  };

  const handleFilterChange = (type: 'distance' | 'category', value: string): void => {
    if (type === 'distance') {
      setDistanceFilter(value);
    } else {
      setCategoryFilter(value);
    }
  };

  // Filter attractions based on selected filters
  const filteredAttractions = attractions.filter(attraction => {
    let distanceMatch = true;
    let categoryMatch = true;

    if (distanceFilter !== 'all') {
      // Simple distance filtering logic
      const distance = parseFloat(attraction.distance.split(' ')[0]);
      if (distanceFilter === 'nearby' && distance > 1) distanceMatch = false;
      if (distanceFilter === '5-10 km' && (distance < 5 || distance > 10)) distanceMatch = false;
      if (distanceFilter === '10+ km' && distance < 10) distanceMatch = false;
    }

    if (categoryFilter !== 'all') {
      categoryMatch = attraction.category === categoryFilter;
    }

    return distanceMatch && categoryMatch;
  });

  return (
    <div className="container">
      <FloatingLanguageSelector />
      
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">{t('localAttractions.title')}</h1>
        <p className="help-text text-center">{t('localAttractions.discover')}</p>
      </div>
      
      <div className="attraction-filters">
        <div className="filter-group">
          <label>{t('localAttractions.filters.distance')}</label>
          <div className="filter-options">
            <div 
              className={`filter-option ${distanceFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('distance', 'all')}
            >
              {t('localAttractions.filters.all')}
            </div>
            <div 
              className={`filter-option ${distanceFilter === 'nearby' ? 'active' : ''}`}
              onClick={() => handleFilterChange('distance', 'nearby')}
            >
              {t('localAttractions.filters.nearby')}
            </div>
            <div 
              className={`filter-option ${distanceFilter === '5-10 km' ? 'active' : ''}`}
              onClick={() => handleFilterChange('distance', '5-10 km')}
            >
              {t('localAttractions.filters.midRange')}
            </div>
            <div 
              className={`filter-option ${distanceFilter === '10+ km' ? 'active' : ''}`}
              onClick={() => handleFilterChange('distance', '10+ km')}
            >
              {t('localAttractions.filters.farther')}
            </div>
          </div>
        </div>
        
        <div className="filter-group">
          <label>{t('localAttractions.filters.category')}</label>
          <div className="filter-options">
            <div 
              className={`filter-option ${categoryFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('category', 'all')}
            >
              {t('localAttractions.filters.all')}
            </div>
            <div 
              className={`filter-option ${categoryFilter === 'museums' ? 'active' : ''}`}
              onClick={() => handleFilterChange('category', 'museums')}
            >
              {t('localAttractions.filters.museums')}
            </div>
            <div 
              className={`filter-option ${categoryFilter === 'parks' ? 'active' : ''}`}
              onClick={() => handleFilterChange('category', 'parks')}
            >
              {t('localAttractions.filters.parks')}
            </div>
            <div 
              className={`filter-option ${categoryFilter === 'shopping' ? 'active' : ''}`}
              onClick={() => handleFilterChange('category', 'shopping')}
            >
              {t('localAttractions.filters.shopping')}
            </div>
            <div 
              className={`filter-option ${categoryFilter === 'dining' ? 'active' : ''}`}
              onClick={() => handleFilterChange('category', 'dining')}
            >
              {t('localAttractions.filters.dining')}
            </div>
          </div>
        </div>
      </div>
      
      <div className="attractions-grid">
        {filteredAttractions.map(attraction => (
          <div className="attraction-card" key={attraction.id}>
            <img src={attraction.image} alt={attraction.title} className="attraction-image" />
            <div className="attraction-content">
              <h3 className="attraction-title">{attraction.title}</h3>
              <div className="attraction-details">
                <div className="attraction-distance">{attraction.distance}</div>
                <div className="attraction-rating">
                  <div className="rating-stars">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i}>{i < attraction.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <div className="rating-count">{attraction.reviewCount} {t('localAttractions.reviews')}</div>
                </div>
              </div>
              <p className="attraction-description">{attraction.description}</p>
              <div className="attraction-actions">
                {attraction.actions.map((action, i) => (
                  <Button 
                    key={i}
                    variant={action.primary ? 'primary' : 'secondary'}
                    onClick={() => handleAttractionAction(attraction.id, action.text)}
                  >
                    {action.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="transportation-section">
        <h2 className="heading-secondary">{t('localAttractions.transportation')}</h2>
        <div className="transportation-options">
          {transportOptions.map(option => (
            <div className="transport-card" key={option.id}>
              <div className="transport-icon">{option.icon}</div>
              <h3 className="transport-title">{option.title}</h3>
              <p className="transport-description">{option.description}</p>
              <Button onClick={() => handleTransportAction(option.id)}>
                {option.action}
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <Button variant="text" onClick={() => navigate('/home')}>
        ← {t('common.backHome')}
      </Button>
      
      <Footer />
    </div>
  );
};

export default LocalAttractions;