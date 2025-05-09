import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
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
  const navigate = useNavigate();
  const [currentFloor, setCurrentFloor] = useState<string>('lobby');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const markers: MapMarker[] = [
    {
      id: 'pool',
      icon: '🏊',
      label: 'Pool',
      position: {
        top: '30%',
        left: '40%'
      }
    },
    {
      id: 'restaurant',
      icon: '🍽️',
      label: 'Restaurant',
      position: {
        top: '50%',
        left: '60%'
      }
    },
    {
      id: 'room',
      icon: '🛌',
      label: 'Your Room',
      position: {
        top: '70%',
        left: '30%'
      }
    }
  ];

  const legendItems: MapLegendItem[] = [
    { icon: '🏊', text: 'Pool' },
    { icon: '🍽️', text: 'Restaurant' },
    { icon: '🚻', text: 'Restrooms' },
    { icon: '🛌', text: 'Your Room' },
    { icon: '🚪', text: 'Exit' },
    { icon: '⬆️', text: 'Elevator' }
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
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">Hotel Map</h1>
        <p className="help-text text-center">Find your way around our property</p>
      </div>
      
      <div className="map-controls">
        <div className="floor-selector">
          <label htmlFor="floor-select">Select Floor:</label>
          <select 
            id="floor-select" 
            className="form-input"
            value={currentFloor}
            onChange={handleFloorChange}
          >
            <option value="lobby">Lobby</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
            <option value="5">Level 5</option>
          </select>
        </div>
        
        <div className="search-location">
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search for a location" 
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
        <h3>Legend</h3>
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
        ← Back to Home
      </Button>
      
      <Footer />
    </div>
  );
};

export default HotelMap;