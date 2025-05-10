import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { checkInUser } from '../api/authService';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import Footer from '../components/common/Footer';
import FloatingLanguageSelector from '../components/common/FloatingLanguageSelector';
import '../styles/pages/CheckIn.css';

interface CheckInFormData {
  phone: string;
  idType: string;
  idNumber: string;
  arrivalTime: string;
  specialRequests: string;
}

const CheckIn: React.FC = () => {
  const { t } = useTranslation();
  const { user, completeCheckIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<CheckInFormData>({
    phone: '',
    idType: '',
    idNumber: '',
    arrivalTime: 'now',
    specialRequests: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await checkInUser(formData);
      
      if (response.success) {
        completeCheckIn();
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
        <h1 className="heading-primary">{t('checkIn.title')}</h1>
      </div>
      
      <Card>
        <h2 className="heading-secondary">{t('checkIn.completeCheckIn')}</h2>
        <p className="help-text">{t('checkIn.confirmDetails')}</p>
        
        {/* Status indicator for check-in process */}
        <div className="status-indicator">
          <div className="status-step completed">
            <div className="status-circle">1</div>
            <div className="status-label">{t('checkIn.steps.reservation')}</div>
          </div>
          <div className="status-line"></div>
          <div className="status-step active">
            <div className="status-circle">2</div>
            <div className="status-label">{t('checkIn.steps.checkIn')}</div>
          </div>
          <div className="status-line"></div>
          <div className="status-step">
            <div className="status-circle">3</div>
            <div className="status-label">{t('checkIn.steps.roomReady')}</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <InputField
            id="guest-name"
            label={t('checkIn.fullName')}
            value={user?.name || 'John Doe'}
            readOnly
          />
          
          <InputField
            id="guest-email"
            label={t('checkIn.email')}
            type="email"
            value={user?.email || 'john.doe@example.com'}
            readOnly
          />
          
          <InputField
            id="phone"
            label={t('checkIn.phone')}
            type="tel"
            placeholder={t('checkIn.phonePrompt')}
            value={formData.phone}
            onChange={handleChange}
            required
          />
          
          <div className="form-group">
            <label className="form-label" htmlFor="idType">{t('checkIn.idType')}</label>
            <select 
              className="form-input" 
              id="idType" 
              value={formData.idType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>{t('checkIn.selectIdType')}</option>
              <option value="passport">{t('checkIn.passport')}</option>
              <option value="driver">{t('checkIn.driversLicense')}</option>
              <option value="national">{t('checkIn.nationalId')}</option>
            </select>
          </div>
          
          <InputField
            id="idNumber"
            label={t('checkIn.idNumber')}
            placeholder={t('checkIn.idNumberPrompt')}
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
          
          <div className="form-group">
            <label className="form-label" htmlFor="arrivalTime">{t('checkIn.arrival')}</label>
            <select 
              className="form-input" 
              id="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
            >
              <option value="now">{t('checkIn.arrivalOptions.now')}</option>
              <option value="1hour">{t('checkIn.arrivalOptions.oneHour')}</option>
              <option value="2hours">{t('checkIn.arrivalOptions.twoHours')}</option>
              <option value="today">{t('checkIn.arrivalOptions.today')}</option>
              <option value="tomorrow">{t('checkIn.arrivalOptions.tomorrow')}</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="specialRequests">{t('checkIn.specialRequests')}</label>
            <textarea 
              className="form-input" 
              id="specialRequests" 
              placeholder={t('checkIn.specialRequestsPrompt')} 
              rows={3}
              value={formData.specialRequests}
              onChange={handleChange}
            ></textarea>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <Button type="submit" loading={loading}>{t('checkIn.completeButton')}</Button>
        </form>
      </Card>
      
      <Footer />
    </div>
  );
};

export default CheckIn;