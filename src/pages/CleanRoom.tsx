// src/pages/CleanRoom.tsx
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppState } from '../context/AppStateContext';
import { requestCleaning, getCleaningSchedule } from '../api/cleanMaintenanceServiceApi';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import FloatingLanguageSelector from '../components/common/FloatingLanguageSelector';
import '../styles/pages/CleanRoom.css';

interface CleaningFormData {
  cleaningType: string;
  cleaningTime: string;
  cleaningNotes: string;
  notPresent: boolean;
}

const CleanRoom: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeRequests, addActiveRequest } = useAppState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showScheduleAdjustment, setShowScheduleAdjustment] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<CleaningFormData>({
    cleaningType: '',
    cleaningTime: '',
    cleaningNotes: '',
    notPresent: false
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await requestCleaning(formData);
      
      if (response.success && response.data) {
        // Add active cleaning request to app state
        addActiveRequest('cleaning', {
          id: response.data.id,
          status: response.data.status,
          requested: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: formData.cleaningType,
          eta: response.data.eta
        });
        
        alert(t('cleanRoom.submitRequest'));
        navigate('/home');
      } else {
        setError(response.message || t('common.error'));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('common.error');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <FloatingLanguageSelector />
      
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">{t('cleanRoom.title')}</h1>
      </div>
      
      {/* Status indicator for cleaning requests */}
      {activeRequests.cleaning && (
        <div className="status-indicator-box" id="cleaning-status">
          <div className="status-indicator-title">{t('cleanRoom.currentRequest')}</div>
          <div className="status-item">
            <div className="status-icon cleaning">🧹</div>
            <div className="status-details">
              <h4>{t('notifications.cleaningProgress')}</h4>
              <p>{t('notifications.requested')} {activeRequests.cleaning.requested}</p>
              <div className="status-progress">
                <div className="status-bar" style={{ width: '75%' }}></div>
              </div>
              <p className="status-label">{t('notifications.inProgress')} - {t('notifications.eta')}: 20 {t('notifications.minutes')}</p>
            </div>
            <button 
              className="btn btn-text btn-cancel"
              onClick={() => alert(t('notifications.cancel'))}
            >
              {t('notifications.cancel')}
            </button>
          </div>
        </div>
      )}
      
      <Card>
        <h2 className="heading-secondary">{t('cleanRoom.requestHousekeeping')}</h2>
        <p className="help-text">{t('cleanRoom.availableHours')}</p>
        
        <form id="cleaning-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="cleaningType">{t('cleanRoom.serviceType')}</label>
            <select 
              className="form-input" 
              id="cleaningType" 
              value={formData.cleaningType}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>{t('cleanRoom.selectServiceType')}</option>
              <option value="full">{t('cleanRoom.services.full')}</option>
              <option value="light">{t('cleanRoom.services.light')}</option>
              <option value="turndown">{t('cleanRoom.services.turndown')}</option>
              <option value="towels">{t('cleanRoom.services.towels')}</option>
              <option value="supplies">{t('cleanRoom.services.supplies')}</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="cleaningTime">{t('cleanRoom.preferredTime')}</label>
            <select 
              className="form-input" 
              id="cleaningTime" 
              value={formData.cleaningTime}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>{t('cleanRoom.selectTime')}</option>
              <option value="asap">{t('cleanRoom.timeOptions.asap')}</option>
              <option value="morning">{t('cleanRoom.timeOptions.morning')}</option>
              <option value="afternoon">{t('cleanRoom.timeOptions.afternoon')}</option>
              <option value="evening">{t('cleanRoom.timeOptions.evening')}</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="cleaningNotes">{t('cleanRoom.specialInstructions')}</label>
            <textarea 
              className="form-input" 
              id="cleaningNotes" 
              placeholder={t('cleanRoom.specialInstructionsPrompt')} 
              rows={3}
              value={formData.cleaningNotes}
              onChange={handleInputChange}
            ></textarea>
          </div>
          
          <div className="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="notPresent" 
              className="form-checkbox"
              checked={formData.notPresent}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="notPresent" className="checkbox-label">
              {t('cleanRoom.notPresent')}
            </label>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <Button type="submit" loading={loading}>{t('cleanRoom.submitRequest')}</Button>
        </form>
      </Card>
      
      <Card>
        <h2 className="heading-secondary">{t('cleanRoom.regularSchedule')}</h2>
        <p className="help-text">{t('cleanRoom.scheduledDays')}</p>
        
        <div className="schedule-days">
          <div className="schedule-day active">
            <div className="day-label">{t('cleanRoom.daysOfWeek.mon')}</div>
          </div>
          <div className="schedule-day">
            <div className="day-label">{t('cleanRoom.daysOfWeek.tue')}</div>
          </div>
          <div className="schedule-day active">
            <div className="day-label">{t('cleanRoom.daysOfWeek.wed')}</div>
          </div>
          <div className="schedule-day">
            <div className="day-label">{t('cleanRoom.daysOfWeek.thu')}</div>
          </div>
          <div className="schedule-day active">
            <div className="day-label">{t('cleanRoom.daysOfWeek.fri')}</div>
          </div>
          <div className="schedule-day">
            <div className="day-label">{t('cleanRoom.daysOfWeek.sat')}</div>
          </div>
          <div className="schedule-day">
            <div className="day-label">{t('cleanRoom.daysOfWeek.sun')}</div>
          </div>
        </div>
        
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="adjust-schedule" 
            className="form-checkbox"
            checked={showScheduleAdjustment}
            onChange={(e) => setShowScheduleAdjustment(e.target.checked)}
          />
          <label htmlFor="adjust-schedule" className="checkbox-label">
            {t('cleanRoom.adjustSchedule')}
          </label>
        </div>
        
        {showScheduleAdjustment && (
          <div className="schedule-adjustment">
            <p className="help-text">{t('cleanRoom.scheduledDays')}</p>
            {/* Day selection UI would go here */}
          </div>
        )}
      </Card>
      
      <Button variant="text" onClick={() => navigate('/home')}>
        ← {t('common.backHome')}
      </Button>
      
      <Footer />
    </div>
  );
};

export default CleanRoom;
