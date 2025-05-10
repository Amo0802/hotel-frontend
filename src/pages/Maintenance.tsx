// src/pages/Maintenance.tsx
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppState } from '../context/AppStateContext';
import { requestMaintenance } from '../api/cleanMaintenanceServiceApi';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import FloatingLanguageSelector from '../components/common/FloatingLanguageSelector';
import '../styles/pages/Maintenance.css';

interface MaintenanceFormData {
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  notPresent: boolean;
  contactMethod: string;
}

const Maintenance: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeRequests, addActiveRequest } = useAppState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<MaintenanceFormData>({
    category: '',
    description: '',
    priority: 'medium',
    notPresent: false,
    contactMethod: 'app'
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData(prev => ({
      ...prev,
      priority: e.target.value as 'low' | 'medium' | 'high'
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
      const response = await requestMaintenance(formData);
      
      if (response.success && response.data) {
        // Add active maintenance request to app state
        addActiveRequest('maintenance', {
          id: response.data.id,
          status: response.data.status,
          requested: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          issue: formData.description.substring(0, 30) + (formData.description.length > 30 ? '...' : ''),
          priority: formData.priority,
          eta: response.data.eta
        });
        
        alert(t('maintenance.submitRequest'));
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
        <h1 className="heading-primary">{t('maintenance.title')}</h1>
        <p className="help-text text-center">{t('maintenance.reportIssues')}</p>
      </div>
      
      {/* Status indicator for maintenance requests */}
      {activeRequests.maintenance && (
        <div className="status-indicator-box" id="maintenance-status">
          <div className="status-indicator-title">{t('maintenance.openRequests')}</div>
          <div className="status-item">
            <div className="status-icon maintenance">🔧</div>
            <div className="status-details">
              <h4>{activeRequests.maintenance.issue}</h4>
              <p>{t('notifications.requested')} {activeRequests.maintenance.requested}</p>
              <div className="status-progress">
                <div className="status-bar" style={{ width: '40%' }}></div>
              </div>
              <p className="status-label">{t('notifications.inProgress')} - {t('notifications.eta')}: Today, 2:00 PM</p>
            </div>
            <button 
              className="btn btn-text btn-update"
              onClick={() => alert(t('notifications.update'))}
            >
              {t('notifications.update')}
            </button>
          </div>
        </div>
      )}
      
      <Card>
        <h2 className="heading-secondary">{t('maintenance.reportIssue')}</h2>
        
        <form id="maintenance-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="category">{t('maintenance.issueCategory')}</label>
            <select 
              className="form-input" 
              id="category" 
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>{t('maintenance.selectCategory')}</option>
              <option value="ac">{t('maintenance.categories.ac')}</option>
              <option value="electrical">{t('maintenance.categories.electrical')}</option>
              <option value="plumbing">{t('maintenance.categories.plumbing')}</option>
              <option value="tv">{t('maintenance.categories.tv')}</option>
              <option value="internet">{t('maintenance.categories.internet')}</option>
              <option value="furniture">{t('maintenance.categories.furniture')}</option>
              <option value="other">{t('maintenance.categories.other')}</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="description">{t('maintenance.issueDescription')}</label>
            <textarea 
              className="form-input" 
              id="description" 
              placeholder={t('maintenance.descriptionPrompt')} 
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label">{t('maintenance.priority')}</label>
            <div className="priority-options">
              <div className="priority-option">
                <input 
                  type="radio" 
                  name="priority" 
                  id="priority-low" 
                  value="low"
                  checked={formData.priority === 'low'}
                  onChange={handlePriorityChange}
                />
                <label htmlFor="priority-low">{t('maintenance.priorityLevels.low')}</label>
              </div>
              <div className="priority-option">
                <input 
                  type="radio" 
                  name="priority" 
                  id="priority-medium" 
                  value="medium"
                  checked={formData.priority === 'medium'}
                  onChange={handlePriorityChange}
                />
                <label htmlFor="priority-medium">{t('maintenance.priorityLevels.medium')}</label>
              </div>
              <div className="priority-option">
                <input 
                  type="radio" 
                  name="priority" 
                  id="priority-high" 
                  value="high"
                  checked={formData.priority === 'high'}
                  onChange={handlePriorityChange}
                />
                <label htmlFor="priority-high">{t('maintenance.priorityLevels.high')}</label>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">{t('maintenance.addPhotos')}</label>
            <div className="photo-upload">
              <Button variant="secondary" type="button">{t('maintenance.takePhoto')}</Button>
              <Button variant="secondary" type="button">{t('maintenance.uploadPhoto')}</Button>
            </div>
            <div className="photo-preview">
              {/* Preview of uploaded photos would appear here */}
            </div>
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
              {t('maintenance.authEntry')}
            </label>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="contactMethod">{t('maintenance.contactMethod')}</label>
            <select 
              className="form-input" 
              id="contactMethod"
              value={formData.contactMethod}
              onChange={handleInputChange}
            >
              <option value="app">{t('maintenance.contactOptions.app')}</option>
              <option value="phone">{t('maintenance.contactOptions.phone')}</option>
              <option value="sms">{t('maintenance.contactOptions.sms')}</option>
              <option value="email">{t('maintenance.contactOptions.email')}</option>
            </select>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <Button type="submit" loading={loading}>{t('common.submit')}</Button>
        </form>
      </Card>
      
      <Button variant="text" onClick={() => navigate('/home')}>
        ← {t('common.backHome')}
      </Button>
      
      <Footer />
    </div>
  );
};

export default Maintenance;