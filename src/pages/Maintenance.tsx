import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import { requestMaintenance } from '../api/cleanMaintenanceServiceApi';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import '../styles/pages/Maintenance.css';

interface MaintenanceFormData {
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  notPresent: boolean;
  contactMethod: string;
}

const Maintenance: React.FC = () => {
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
        
        alert('Your maintenance request has been submitted.');
        navigate('/home');
      } else {
        setError(response.message || 'Failed to submit maintenance request.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">Maintenance Request</h1>
        <p className="help-text text-center">Report any issues in your room</p>
      </div>
      
      {/* Status indicator for maintenance requests */}
      {activeRequests.maintenance && (
        <div className="status-indicator-box" id="maintenance-status">
          <div className="status-indicator-title">Open Requests</div>
          <div className="status-item">
            <div className="status-icon maintenance">🔧</div>
            <div className="status-details">
              <h4>{activeRequests.maintenance.issue}</h4>
              <p>Requested at {activeRequests.maintenance.requested}</p>
              <div className="status-progress">
                <div className="status-bar" style={{ width: '40%' }}></div>
              </div>
              <p className="status-label">Technician assigned - ETA: Today, 2:00 PM</p>
            </div>
            <button 
              className="btn btn-text btn-update"
              onClick={() => alert('Update request?')}
            >
              Update
            </button>
          </div>
        </div>
      )}
      
      <Card>
        <h2 className="heading-secondary">Report an Issue</h2>
        
        <form id="maintenance-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="category">Issue Category</label>
            <select 
              className="form-input" 
              id="category" 
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select Category</option>
              <option value="ac">Air Conditioning/Heating</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="tv">TV/Entertainment</option>
              <option value="internet">Internet/WiFi</option>
              <option value="furniture">Furniture/Fixtures</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="description">Issue Description</label>
            <textarea 
              className="form-input" 
              id="description" 
              placeholder="Please describe the problem in detail" 
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label">Priority</label>
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
                <label htmlFor="priority-low">Low - Not urgent</label>
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
                <label htmlFor="priority-medium">Medium - Needs attention</label>
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
                <label htmlFor="priority-high">High - Urgent issue</label>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Add Photos</label>
            <div className="photo-upload">
              <Button variant="secondary" type="button">Take Photo</Button>
              <Button variant="secondary" type="button">Upload Photo</Button>
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
              I authorize entry to my room in my absence
            </label>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="contactMethod">Preferred Contact Method</label>
            <select 
              className="form-input" 
              id="contactMethod"
              value={formData.contactMethod}
              onChange={handleInputChange}
            >
              <option value="app">App Notification</option>
              <option value="phone">Phone Call</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </select>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <Button type="submit" loading={loading}>Submit Request</Button>
        </form>
      </Card>
      
      <Button variant="text" onClick={() => navigate('/home')}>
        ← Back to Home
      </Button>
      
      <Footer />
    </div>
  );
};

export default Maintenance;