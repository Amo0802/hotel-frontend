// Component for the home screen
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { toggleDnd as toggleDndApi } from '../api/cleanMaintenanceServiceApi';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import StatusNotification from '../components/home/StatusNotification';
import OptionCard from '../components/home/OptionCard';
import Footer from '../components/common/Footer';
import '../styles/pages/Home.css';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { dndActive, toggleDnd, activeRequests } = useAppState();
  const navigate = useNavigate();

  const handleDndToggle = async (): Promise<void> => {
    try {
      // Call API to toggle DND status
      await toggleDndApi(!dndActive);
      // Update local state
      toggleDnd();
    } catch (error) {
      console.error('Failed to toggle DND status:', error);
      alert('Failed to update Do Not Disturb status. Please try again.');
    }
  };

  const handleOptionClick = (route: string): void => {
    navigate(route);
  };

  // This function handles the special case of DND toggle
  const handleOptionOrAction = (option: string): void => {
    if (option === 'dnd-toggle') {
      handleDndToggle();
    } else {
      handleOptionClick(`/${option}`);
    }
  };

  return (
    <div className="container">
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">Welcome to Our Hotel</h1>
      </div>
      
      {/* Status Notifications */}
      <div className="status-notifications">
        {activeRequests.cleaning && (
          <StatusNotification
            type="cleaning"
            title="Room Cleaning in Progress"
            time={activeRequests.cleaning.requested}
            onAction={() => navigate('/clean-room')}
          />
        )}
        
        {activeRequests.maintenance && (
          <StatusNotification
            type="maintenance"
            title={activeRequests.maintenance.issue}
            time={activeRequests.maintenance.requested}
            onAction={() => navigate('/maintenance')}
          />
        )}
        
        {dndActive && (
          <StatusNotification
            type="dnd"
            title="Do Not Disturb Enabled"
            time="Active"
            actionText="Disable"
            onAction={handleDndToggle}
          />
        )}
      </div>
      
      {/* Option Grid */}
      <div className="option-grid">
        <OptionCard
          id="food-dining"
          icon="🍽️"
          title="Food & Dining"
          description="Room service, restaurant, & reservations"
          onClick={() => handleOptionOrAction('food-dining')}
        />
        
        <OptionCard
          id="amenities"
          icon="🏊"
          title="Amenities"
          description="Spa, pool, gym & other facilities"
          onClick={() => handleOptionOrAction('amenities')}
        />
        
        <OptionCard
          id="hotel-map"
          icon="🗺️"
          title="Hotel Map"
          description="Navigate around our property"
          onClick={() => handleOptionOrAction('hotel-map')}
        />
        
        <OptionCard
          id="local-attractions"
          icon="🏛️"
          title="Local Attractions"
          description="Discover places & transportation"
          onClick={() => handleOptionOrAction('local-attractions')}
        />
        
        <OptionCard
          id="clean-room"
          icon="🧹"
          title="Clean Room"
          description="Request housekeeping service"
          onClick={() => handleOptionOrAction('clean-room')}
        />
        
        <OptionCard
          id="maintenance"
          icon="🔧"
          title="Maintenance"
          description="Report issues in your room"
          onClick={() => handleOptionOrAction('maintenance')}
        />

        <OptionCard
          id="dnd-toggle"
          icon={dndActive ? "🔔" : "🔕"}
          title="Do Not Disturb"
          description="Toggle privacy mode for your room"
          onClick={() => handleOptionOrAction('dnd-toggle')}
        />
        
        <OptionCard
          id="lost-found"
          icon="🔍"
          title="Lost & Found"
          description="Report or claim lost items"
          onClick={() => handleOptionOrAction('lost-found')}
        />
        
        <OptionCard
          id="feedback"
          icon="⭐"
          title="Feedback & Reviews"
          description="Share your experience"
          onClick={() => handleOptionOrAction('feedback')}
        />
        
        <OptionCard
          id="ask-question"
          icon="❓"
          title="Ask a Question"
          description="Get help with anything"
          onClick={() => handleOptionOrAction('chatbot')}
        />
        
        <OptionCard
          id="check-out"
          icon="CO"
          title="Check Out"
          description="Complete your check-out process"
          onClick={() => handleOptionOrAction('check-out')}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;