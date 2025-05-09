import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import { requestCleaning, getCleaningSchedule } from '../api/cleanMaintenanceServiceApi';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import '../styles/pages/CleanRoom.css';

interface CleaningFormData {
  cleaningType: string;
  cleaningTime: string;
  cleaningNotes: string;
  notPresent: boolean;
}

const CleanRoom: React.FC = () => {
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
        
        alert('Your cleaning request has been submitted.');
        navigate('/home');
      } else {
        setError(response.message || 'Failed to submit cleaning request.');
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
        <h1 className="heading-primary">Housekeeping Services</h1>
      </div>
      
      {/* Status indicator for cleaning requests */}
      {activeRequests.cleaning && (
        <div className="status-indicator-box" id="cleaning-status">
          <div className="status-indicator-title">Current Request</div>
          <div className="status-item">
            <div className="status-icon cleaning">🧹</div>
            <div className="status-details">
              <h4>Room Cleaning</h4>
              <p>Requested at {activeRequests.cleaning.requested}</p>
              <div className="status-progress">
                <div className="status-bar" style={{ width: '75%' }}></div>
              </div>
              <p className="status-label">In progress - ETA: 20 minutes</p>
            </div>
            <button 
              className="btn btn-text btn-cancel"
              onClick={() => alert('Cancel request?')}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <Card>
        <h2 className="heading-secondary">Request Housekeeping</h2>
        <p className="help-text">Our housekeeping team is available from 8:00 AM to 8:00 PM daily.</p>
        
        <form id="cleaning-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="cleaningType">Service Type</label>
            <select 
              className="form-input" 
              id="cleaningType" 
              value={formData.cleaningType}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select Service Type</option>
              <option value="full">Full Cleaning</option>
              <option value="light">Light Cleaning</option>
              <option value="turndown">Turndown Service</option>
              <option value="towels">Fresh Towels Only</option>
              <option value="supplies">Restock Supplies</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="cleaningTime">Preferred Time</label>
            <select 
              className="form-input" 
              id="cleaningTime" 
              value={formData.cleaningTime}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select Time</option>
              <option value="asap">As Soon As Possible</option>
              <option value="morning">Morning (8AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 4PM)</option>
              <option value="evening">Evening (4PM - 8PM)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="cleaningNotes">Special Instructions</label>
            <textarea 
              className="form-input" 
              id="cleaningNotes" 
              placeholder="Any special requests or instructions?" 
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
              I will not be present during cleaning
            </label>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <Button type="submit" loading={loading}>Submit Request</Button>
        </form>
      </Card>
      
      <Card>
        <h2 className="heading-secondary">Regular Cleaning Schedule</h2>
        <p className="help-text">Your room is scheduled for regular cleaning on the following days:</p>
        
        <div className="schedule-days">
          <div className="schedule-day active">
            <div className="day-label">Mon</div>
          </div>
          <div className="schedule-day">
            <div className="day-label">Tue</div>
          </div>
          <div className="schedule-day active">
            <div className="day-label">Wed</div>
          </div>
          <div className="schedule-day">
            <div className="day-label">Thu</div>
          </div>
          <div className="schedule-day active">
            <div className="day-label">Fri</div>
          </div>
          <div className="schedule-day">
            <div className="day-label">Sat</div>
          </div>
          <div className="schedule-day">
            <div className="day-label">Sun</div>
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
            I'd like to adjust my regular cleaning schedule
          </label>
        </div>
        
        {showScheduleAdjustment && (
          <div className="schedule-adjustment">
            <p className="help-text">Select which days you'd like your room to be cleaned:</p>
            {/* Day selection UI would go here */}
          </div>
        )}
      </Card>
      
      <Button variant="text" onClick={() => navigate('/home')}>
        ← Back to Home
      </Button>
      
      <Footer />
    </div>
  );
};

export default CleanRoom;
