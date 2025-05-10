import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import Footer from '../components/common/Footer';
import FloatingLanguageSelector from '../components/common/FloatingLanguageSelector';
import '../styles/pages/Login.css';

const Login: React.FC = () => {
  const { t } = useTranslation();
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
    alert(t('login.codeHelp'));
  };

  return (
    <div className="container">
      <FloatingLanguageSelector />
      
      <div className="logo-area">
        <LogoPlaceholder />
      </div>
      
      <Card>
        <h1 className="heading-primary">{t('login.title')}</h1>
        <p className="help-text text-center">{t('login.prompt')}</p>
        
        <form onSubmit={handleSubmit}>
          <InputField
            id="reservation-code"
            type="text"
            placeholder={t('login.reservationCode')}
            value={reservationCode}
            onChange={(e) => setReservationCode(e.target.value)}
            required
            error={error}
          />
          
          <Button type="submit" loading={loading}>{t('login.login')}</Button>
        </form>
        
        <div className="text-center">
          <a href="#" className="link" onClick={handleForgotCode}>
            {t('login.forgotCode')}
          </a>
        </div>
      </Card>
      
      <Card>
        <h2 className="heading-secondary">{t('login.firstTime')}</h2>
        <p className="help-text">
          {t('login.codeHelp')}
        </p>
      </Card>
      
      <Footer />
    </div>
  );
};

export default Login;