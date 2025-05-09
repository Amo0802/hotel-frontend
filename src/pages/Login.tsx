// Component for login screen
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import Footer from '../components/common/Footer';
import '../styles/pages/Login.css';

const Login: React.FC = () => {
  const [reservationCode, setReservationCode] = useState<string>('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!reservationCode.trim()) return;
    
    const result = await login(reservationCode);
    
    if (result.success) {
      // Navigate to appropriate page based on check-in status
      navigate('/check-in');
    }
  };

  const handleForgotCode = (): void => {
    alert('You can find your code in your booking confirmation email or get it at the reception.');
  };

  return (
    <div className="container">
      <div className="logo-area">
        <LogoPlaceholder />
      </div>
      
      <Card>
        <h1 className="heading-primary">Welcome</h1>
        <p className="help-text text-center">Please enter your reservation code to continue</p>
        
        <form onSubmit={handleSubmit}>
          <InputField
            id="reservation-code"
            type="text"
            placeholder="Enter your code"
            value={reservationCode}
            onChange={(e) => setReservationCode(e.target.value)}
            required
            error={error}
          />
          
          <Button type="submit" loading={loading}>Login</Button>
        </form>
        
        <div className="text-center">
          <a href="#" className="link" onClick={handleForgotCode}>
            Where can I find my code?
          </a>
        </div>
      </Card>
      
      <Card>
        <h2 className="heading-secondary">First time here?</h2>
        <p className="help-text">
          Your reservation code was sent to you in your booking confirmation.
          If you're checking in today, you can also get your code at the reception.
        </p>
      </Card>
      
      <Footer />
    </div>
  );
};

export default Login;
