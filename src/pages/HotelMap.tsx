// src/pages/HotelMap.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import FloatingLanguageSelector from '../components/common/FloatingLanguageSelector';
import '../styles/pages/HotelMap.css';

interface MapMarker {
  id: string;
  icon: string;
  label: string;
  position: {
    top: string;
    left: string;
  };
}

interface MapLegendItem {
  icon: string;
  text: string;
}

const HotelMap: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentFloor, setCurrentFloor] = useState<string>('lobby');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const markers: MapMarker[] = [
    {
      id: 'pool',
      icon: '🏊',
      label: t('hotelMap.locations.pool'),
      position: {
        top: '30%',
        left: '40%'
      }
    },
    {
      id: 'restaurant',
      icon: '🍽️',
      label: t('hotelMap.locations.restaurant'),
      position: {
        top: '50%',
        left: '60%'
      }
    },
    {
      id: 'room',
      icon: '🛌',
      label: t('hotelMap.locations.yourRoom'),
      position: {
        top: '70%',
        left: '30%'
      }
    }
  ];

  const legendItems: MapLegendItem[] = [
    { icon: '🏊', text: t('hotelMap.locations.pool') },
    { icon: '🍽️', text: t('hotelMap.locations.restaurant') },
    { icon: '🚻', text: t('hotelMap.locations.restrooms') },
    { icon: '🛌', text: t('hotelMap.locations.yourRoom') },
    { icon: '🚪', text: t('hotelMap.locations.exit') },
    { icon: '⬆️', text: t('hotelMap.locations.elevator') }
  ];

  const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCurrentFloor(e.target.value);
    alert(`Changing to floor: ${e.target.value}`);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      alert(`Searching for: ${searchTerm}`);
    }
  };

  return (
    <div className="container">
      <FloatingLanguageSelector />
      
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">{t('hotelMap.title')}</h1>
        <p className="help-text text-center">{t('hotelMap.findYourWay')}</p>
      </div>
      
      <div className="map-controls">
        <div className="floor-selector">
          <label htmlFor="floor-select">{t('hotelMap.selectFloor')}</label>
          <select 
            id="floor-select" 
            className="form-input"
            value={currentFloor}
            onChange={handleFloorChange}
          >
            <option value="lobby">{t('hotelMap.floors.lobby')}</option>
            <option value="1">{t('hotelMap.floors.level1')}</option>
            <option value="2">{t('hotelMap.floors.level2')}</option>
            <option value="3">{t('hotelMap.floors.level3')}</option>
            <option value="4">{t('hotelMap.floors.level4')}</option>
            <option value="5">{t('hotelMap.floors.level5')}</option>
          </select>
        </div>
        
        <div className="search-location">
          <input 
            type="text" 
            className="form-input" 
            placeholder={t('hotelMap.searchLocation')} 
            id="map-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearch}
          />
          <button className="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="map-container">
        <div className="placeholder-map">
          <img src="/api/placeholder/600/400" alt="Hotel Map" className="map-image" />
          <div className="you-are-here-marker">
            <div className="marker-dot"></div>
            <div className="marker-pulse"></div>
          </div>
          
          {markers.map(marker => (
            <div 
              key={marker.id}
              className="map-marker" 
              style={{ top: marker.position.top, left: marker.position.left }}
            >
              <div className="marker-icon">{marker.icon}</div>
              <div className="marker-label">{marker.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="map-legend">
        <h3>{t('hotelMap.legend')}</h3>
        <div className="legend-items">
          {legendItems.map((item, index) => (
            <div key={index} className="legend-item">
              <div className="legend-icon">{item.icon}</div>
              <div className="legend-text">{item.text}</div>
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

export default HotelMap;