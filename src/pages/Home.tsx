import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { toggleDnd as toggleDndApi } from '../api/cleanMaintenanceServiceApi';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import StatusNotification from '../components/home/StatusNotification';
import OptionCard from '../components/home/OptionCard';
import Footer from '../components/common/Footer';
import FloatingLanguageSelector from '../components/common/FloatingLanguageSelector';
import '../styles/pages/Home.css';

const Home: React.FC = () => {
  const { t } = useTranslation();
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
      {/* Add the floating language selector */}
      <FloatingLanguageSelector />
      
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">{t('common.welcome')}</h1>
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
          title={t('home.foodDining')}
          description={t('home.foodDiningDesc')}
          onClick={() => handleOptionOrAction('food-dining')}
        />
        
        <OptionCard
          id="amenities"
          icon="🏊"
          title={t('home.amenities')}
          description={t('home.amenitiesDesc')}
          onClick={() => handleOptionOrAction('amenities')}
        />
        
        <OptionCard
          id="hotel-map"
          icon="🗺️"
          title={t('home.hotelMap')}
          description={t('home.hotelMapDesc')}
          onClick={() => handleOptionOrAction('hotel-map')}
        />
        
        <OptionCard
          id="local-attractions"
          icon="🏛️"
          title={t('home.localAttractions')}
          description={t('home.localAttractionsDesc')}
          onClick={() => handleOptionOrAction('local-attractions')}
        />
        
        <OptionCard
          id="clean-room"
          icon="🧹"
          title={t('home.cleanRoom')}
          description={t('home.cleanRoomDesc')}
          onClick={() => handleOptionOrAction('clean-room')}
        />
        
        <OptionCard
          id="maintenance"
          icon="🔧"
          title={t('home.maintenance')}
          description={t('home.maintenanceDesc')}
          onClick={() => handleOptionOrAction('maintenance')}
        />

        <OptionCard
          id="dnd-toggle"
          icon={dndActive ? "🔔" : "🔕"}
          title={t('home.dnd')}
          description={t('home.dndDesc')}
          onClick={() => handleOptionOrAction('dnd-toggle')}
        />
        
        <OptionCard
          id="lost-found"
          icon="🔍"
          title={t('home.lostFound')}
          description={t('home.lostFoundDesc')}
          onClick={() => handleOptionOrAction('lost-found')}
        />
        
        <OptionCard
          id="feedback"
          icon="⭐"
          title={t('home.feedback')}
          description={t('home.feedbackDesc')}
          onClick={() => handleOptionOrAction('feedback')}
        />
        
        <OptionCard
          id="ask-question"
          icon="❓"
          title={t('home.askQuestion')}
          description={t('home.askQuestionDesc')}
          onClick={() => handleOptionOrAction('chatbot')}
        />
        
        <OptionCard
          id="check-out"
          icon="CO"
          title={t('home.checkOut')}
          description={t('home.checkOutDesc')}
          onClick={() => handleOptionOrAction('check-out')}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;