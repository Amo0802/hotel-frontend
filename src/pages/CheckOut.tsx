// src/pages/CheckOut.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import FloatingLanguageSelector from '../components/common/FloatingLanguageSelector';
import '../styles/pages/CheckOut.css';

// Types for checkout data
interface BillItem {
  id: string;
  description: string;
  date: string;
  amount: number;
}

interface CheckoutData {
  guestName: string;
  roomNumber: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  billItems: BillItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  depositPaid: number;
  balanceDue: number;
}

// Mock checkout data - in a real app, you would fetch this from API
const mockCheckoutData: CheckoutData = {
  guestName: 'John Doe',
  roomNumber: '301',
  roomType: 'Deluxe King',
  checkInDate: 'May 5, 2025',
  checkOutDate: 'May 9, 2025',
  billItems: [
    { id: '1', description: 'Room Charge - Deluxe King', date: 'May 5, 2025', amount: 199.00 },
    { id: '2', description: 'Room Charge - Deluxe King', date: 'May 6, 2025', amount: 199.00 },
    { id: '3', description: 'Room Charge - Deluxe King', date: 'May 7, 2025', amount: 199.00 },
    { id: '4', description: 'Room Charge - Deluxe King', date: 'May 8, 2025', amount: 199.00 },
    { id: '5', description: 'Room Service - Dinner', date: 'May 6, 2025', amount: 45.00 },
    { id: '6', description: 'Mini Bar', date: 'May 7, 2025', amount: 18.50 },
  ],
  subtotal: 859.50,
  taxRate: 0.12,
  taxAmount: 103.14,
  total: 962.64,
  depositPaid: 200.00,
  balanceDue: 762.64
};

type LateCheckoutOption = 'standard' | '1pm' | '3pm' | '6pm';
type PaymentMethod = 'card-on-file' | 'new-card' | 'pay-at-desk';
type FeedbackRating = 'poor' | 'average' | 'good' | 'excellent';

const CheckOut: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [checkoutData, setCheckoutData] = useState<CheckoutData>(mockCheckoutData);
  const [lateCheckout, setLateCheckout] = useState<LateCheckoutOption>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card-on-file');
  const [showNewCardForm, setShowNewCardForm] = useState<boolean>(false);
  const [feedbackRating, setFeedbackRating] = useState<FeedbackRating | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // In real app, you would fetch checkout data from API
  useEffect(() => {
    // Simulating API call
    const fetchCheckoutData = async (): Promise<void> => {
      // const response = await fetchBillData();
      // if (response.success) {
      //   setCheckoutData(response.data);
      // }
    };

    fetchCheckoutData();
  }, []);

  const handleLateCheckoutChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setLateCheckout(e.target.value as LateCheckoutOption);
    
    // In a real app, you would update the bill based on the selected option
    if (e.target.value !== 'standard') {
      alert('Late checkout selected. Additional fees may apply.');
      
      // Example of updating the bill data
      const additionalFee = e.target.value === '1pm' ? 20 : 
                           e.target.value === '3pm' ? 40 : 60;
      
      setCheckoutData(prev => {
        const newSubtotal = prev.subtotal + additionalFee;
        const newTaxAmount = newSubtotal * prev.taxRate;
        const newTotal = newSubtotal + newTaxAmount;
        const newBalanceDue = newTotal - prev.depositPaid;
        
        return {
          ...prev,
          subtotal: newSubtotal,
          taxAmount: newTaxAmount,
          total: newTotal,
          balanceDue: newBalanceDue,
          billItems: [
            ...prev.billItems,
            { 
              id: (prev.billItems.length + 1).toString(), 
              description: `Late Checkout (${e.target.value})`, 
              date: prev.checkOutDate, 
              amount: additionalFee 
            }
          ]
        };
      });
    }
  };

  const handlePaymentMethodChange = (method: PaymentMethod): void => {
    setPaymentMethod(method);
    setShowNewCardForm(method === 'new-card');
  };

  const handleViewDetailedBill = (): void => {
    alert(t('checkOut.bill.viewDetailed'));
  };

  const handleEmailReceipt = (): void => {
    alert(t('checkOut.bill.emailReceipt'));
  };

  const handleFeedbackSelection = (rating: FeedbackRating): void => {
    setFeedbackRating(rating);
  };

  const handleDetailedFeedback = (): void => {
    navigate('/feedback');
  };

  const handleCompleteCheckout = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call API to complete checkout
      // const response = await completeCheckout({
      //   paymentMethod,
      //   lateCheckout,
      //   feedbackRating
      // });
      
      // if (response.success) {
      //   alert('Check-out completed successfully. Thank you for staying with us!');
      //   logout();
      //   navigate('/login');
      // } else {
      //   setError(response.message);
      // }
      
      // Simulating successful checkout
      setTimeout(() => {
        alert('Check-out completed successfully. Thank you for staying with us!');
        logout();
        navigate('/login');
      }, 1500);
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
        <h1 className="heading-primary">{t('checkOut.title')}</h1>
      </div>
      
      {/* Status indicator for check-out process */}
      <div className="status-indicator">
        <div className="status-step active">
          <div className="status-circle">1</div>
          <div className="status-label">{t('checkOut.steps.review')}</div>
        </div>
        <div className="status-line"></div>
        <div className="status-step">
          <div className="status-circle">2</div>
          <div className="status-label">{t('checkOut.steps.payment')}</div>
        </div>
        <div className="status-line"></div>
        <div className="status-step">
          <div className="status-circle">3</div>
          <div className="status-label">{t('checkOut.steps.confirm')}</div>
        </div>
      </div>
      
      <Card>
        <h2 className="heading-secondary">{t('checkOut.staySummary')}</h2>
        
        <div className="stay-details">
          <div className="stay-detail-item">
            <div className="detail-label">{t('checkOut.stayDetails.guest')}</div>
            <div className="detail-value">{checkoutData.guestName}</div>
          </div>
          <div className="stay-detail-item">
            <div className="detail-label">{t('checkOut.stayDetails.room')}</div>
            <div className="detail-value">{checkoutData.roomNumber} - {checkoutData.roomType}</div>
          </div>
          <div className="stay-detail-item">
            <div className="detail-label">{t('checkOut.stayDetails.checkIn')}</div>
            <div className="detail-value">{checkoutData.checkInDate}</div>
          </div>
          <div className="stay-detail-item">
            <div className="detail-label">{t('checkOut.stayDetails.checkOut')}</div>
            <div className="detail-value">{checkoutData.checkOutDate} (Today)</div>
          </div>
          <div className="stay-detail-item">
            <div className="detail-label">{t('checkOut.stayDetails.lateCheckOut')}</div>
            <div className="detail-value">
              <select 
                className="form-input" 
                id="late-checkout"
                value={lateCheckout}
                onChange={handleLateCheckoutChange}
              >
                <option value="standard">{t('checkOut.checkOutOptions.standard')}</option>
                <option value="1pm">{t('checkOut.checkOutOptions.1pm')}</option>
                <option value="3pm">{t('checkOut.checkOutOptions.3pm')}</option>
                <option value="6pm">{t('checkOut.checkOutOptions.6pm')}</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
      
      <Card>
        <h2 className="heading-secondary">{t('checkOut.bill.title')}</h2>
        
        <div className="bill-summary">
          <div className="bill-header">
            <div className="bill-col">{t('checkOut.bill.description')}</div>
            <div className="bill-col">{t('checkOut.bill.date')}</div>
            <div className="bill-col">{t('checkOut.bill.amount')}</div>
          </div>
          
          {checkoutData.billItems.map(item => (
            <div className="bill-item" key={item.id}>
              <div className="bill-col">{item.description}</div>
              <div className="bill-col">{item.date}</div>
              <div className="bill-col">${item.amount.toFixed(2)}</div>
            </div>
          ))}
          
          <div className="bill-subtotal">
            <div className="bill-col">{t('checkOut.bill.subtotal')}</div>
            <div className="bill-col"></div>
            <div className="bill-col">${checkoutData.subtotal.toFixed(2)}</div>
          </div>
          
          <div className="bill-item">
            <div className="bill-col">{t('checkOut.bill.tax')} ({(checkoutData.taxRate * 100).toFixed(0)}%)</div>
            <div className="bill-col"></div>
            <div className="bill-col">${checkoutData.taxAmount.toFixed(2)}</div>
          </div>
          
          <div className="bill-total">
            <div className="bill-col">{t('checkOut.bill.total')}</div>
            <div className="bill-col"></div>
            <div className="bill-col">${checkoutData.total.toFixed(2)}</div>
          </div>
          
          <div className="bill-item">
            <div className="bill-col">{t('checkOut.bill.depositPaid')}</div>
            <div className="bill-col">{checkoutData.checkInDate}</div>
            <div className="bill-col">-${checkoutData.depositPaid.toFixed(2)}</div>
          </div>
          
          <div className="bill-balance">
            <div className="bill-col">{t('checkOut.bill.balanceDue')}</div>
            <div className="bill-col"></div>
            <div className="bill-col">${checkoutData.balanceDue.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="bill-actions">
          <Button variant="secondary" onClick={handleViewDetailedBill}>{t('checkOut.bill.viewDetailed')}</Button>
          <Button variant="secondary" onClick={handleEmailReceipt}>{t('checkOut.bill.emailReceipt')}</Button>
        </div>
      </Card>
      
      <Card>
        <h2 className="heading-secondary">{t('checkOut.paymentMethod.title')}</h2>
        <div className="payment-methods">
          <div 
            className={`payment-method-option ${paymentMethod === 'card-on-file' ? 'active' : ''}`}
            onClick={() => handlePaymentMethodChange('card-on-file')}
          >
            <input 
              type="radio" 
              name="payment-method" 
              id="card-on-file" 
              checked={paymentMethod === 'card-on-file'} 
              onChange={() => {}}
            />
            <label htmlFor="card-on-file">
              <div className="payment-label">{t('checkOut.paymentMethod.cardOnFile')}</div>
              <div className="payment-details">VISA •••• 4567</div>
            </label>
          </div>
          
          <div 
            className={`payment-method-option ${paymentMethod === 'new-card' ? 'active' : ''}`}
            onClick={() => handlePaymentMethodChange('new-card')}
          >
            <input 
              type="radio" 
              name="payment-method" 
              id="new-card" 
              checked={paymentMethod === 'new-card'} 
              onChange={() => {}}
            />
            <label htmlFor="new-card">
              <div className="payment-label">{t('checkOut.paymentMethod.newCard')}</div>
            </label>
          </div>
          
          <div 
            className={`payment-method-option ${paymentMethod === 'pay-at-desk' ? 'active' : ''}`}
            onClick={() => handlePaymentMethodChange('pay-at-desk')}
          >
            <input 
              type="radio" 
              name="payment-method" 
              id="pay-at-desk" 
              checked={paymentMethod === 'pay-at-desk'} 
              onChange={() => {}}
            />
            <label htmlFor="pay-at-desk">
              <div className="payment-label">{t('checkOut.paymentMethod.payFrontDesk')}</div>
            </label>
          </div>
        </div>
        
        {/* New card form would be conditionally shown */}
        {showNewCardForm && (
          <div className="new-card-form">
            <div className="form-group">
              <label className="form-label">{t('checkOut.paymentMethod.cardNumber')}</label>
              <input type="text" className="form-input" placeholder={t('checkOut.paymentMethod.cardNumber')} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t('checkOut.paymentMethod.expiryDate')}</label>
                <input type="text" className="form-input" placeholder="MM/YY" />
              </div>
              <div className="form-group">
                <label className="form-label">{t('checkOut.paymentMethod.cvc')}</label>
                <input type="text" className="form-input" placeholder="CVC" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">{t('checkOut.paymentMethod.cardholderName')}</label>
              <input type="text" className="form-input" placeholder={t('checkOut.paymentMethod.cardholderName')} />
            </div>
          </div>
        )}
      </Card>
      
      <Card>
        <h2 className="heading-secondary">{t('checkOut.feedback.title')}</h2>
        <p className="help-text">{t('checkOut.feedback.howWasStay')}</p>
        
        <div className="quick-rating">
          <div className="quick-rating-options">
            <div 
              className={`rating-option ${feedbackRating === 'poor' ? 'active' : ''}`}
              onClick={() => handleFeedbackSelection('poor')}
            >
              <div className="rating-emoji">😞</div>
              <div className="rating-label">{t('checkOut.feedback.ratings.poor')}</div>
            </div>
            <div 
              className={`rating-option ${feedbackRating === 'average' ? 'active' : ''}`}
              onClick={() => handleFeedbackSelection('average')}
            >
              <div className="rating-emoji">😐</div>
              <div className="rating-label">{t('checkOut.feedback.ratings.average')}</div>
            </div>
            <div 
              className={`rating-option ${feedbackRating === 'good' ? 'active' : ''}`}
              onClick={() => handleFeedbackSelection('good')}
            >
              <div className="rating-emoji">🙂</div>
              <div className="rating-label">{t('checkOut.feedback.ratings.good')}</div>
            </div>
            <div 
              className={`rating-option ${feedbackRating === 'excellent' ? 'active' : ''}`}
              onClick={() => handleFeedbackSelection('excellent')}
            >
              <div className="rating-emoji">😄</div>
              <div className="rating-label">{t('checkOut.feedback.ratings.excellent')}</div>
            </div>
          </div>
          
          <a href="#" className="link" onClick={handleDetailedFeedback}>{t('checkOut.feedback.detailedFeedback')} →</a>
        </div>
      </Card>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="checkout-actions">
        <Button variant="secondary" onClick={() => navigate('/home')}>{t('checkOut.actions.notNow')}</Button>
        <Button 
          onClick={handleCompleteCheckout} 
          loading={loading}
        >
          {t('checkOut.actions.completeCheckOut')}
        </Button>
      </div>
      
      <Footer />
    </div>
  );
};

export default CheckOut;