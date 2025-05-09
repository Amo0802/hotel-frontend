import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { checkInUser } from '../api/authApi';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import Footer from '../components/common/Footer';
import '../styles/pages/CheckIn.css';

interface CheckInFormData {
  phone: string;
  idType: string;
  idNumber: string;
  arrivalTime: string;
  specialRequests: string;
}

const CheckIn: React.FC = () => {
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
        setError(response.message || 'An error occurred during check-in.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">Check-In</h1>
      </div>
      
      <Card>
        <h2 className="heading-secondary">Complete Your Check-In</h2>
        <p className="help-text">Please confirm your details below to complete the check-in process.</p>
        
        {/* Status indicator for check-in process */}
        <div className="status-indicator">
          <div className="status-step completed">
            <div className="status-circle">1</div>
            <div className="status-label">Reservation</div>
          </div>
          <div className="status-line"></div>
          <div className="status-step active">
            <div className="status-circle">2</div>
            <div className="status-label">Check-In</div>
          </div>
          <div className="status-line"></div>
          <div className="status-step">
            <div className="status-circle">3</div>
            <div className="status-label">Room Ready</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <InputField
            id="guest-name"
            label="Full Name"
            value={user?.name || 'John Doe'}
            readOnly
          />
          
          <InputField
            id="guest-email"
            label="Email"
            type="email"
            value={user?.email || 'john.doe@example.com'}
            readOnly
          />
          
          <InputField
            id="phone"
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          
          <div className="form-group">
            <label className="form-label" htmlFor="idType">ID Type</label>
            <select 
              className="form-input" 
              id="idType" 
              value={formData.idType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select ID Type</option>
              <option value="passport">Passport</option>
              <option value="driver">Driver's License</option>
              <option value="national">National ID</option>
            </select>
          </div>
          
          <InputField
            id="idNumber"
            label="ID Number"
            placeholder="Enter your ID number"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
          
          <div className="form-group">
            <label className="form-label" htmlFor="arrivalTime">Estimated Arrival Time</label>
            <select 
              className="form-input" 
              id="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
            >
              <option value="now">I'm arriving now</option>
              <option value="1hour">Within 1 hour</option>
              <option value="2hours">Within 2 hours</option>
              <option value="today">Later today</option>
              <option value="tomorrow">Tomorrow</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="specialRequests">Special Requests</label>
            <textarea 
              className="form-input" 
              id="specialRequests" 
              placeholder="Any special requests for your stay?" 
              rows={3}
              value={formData.specialRequests}
              onChange={handleChange}
            ></textarea>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <Button type="submit" loading={loading}>Complete Check-In</Button>
        </form>
      </Card>
      
      <Footer />
    </div>
  );
};

export default CheckIn;