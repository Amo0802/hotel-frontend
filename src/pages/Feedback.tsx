// src/pages/Feedback.tsx
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import FloatingLanguageSelector from '../components/common/FloatingLanguageSelector';
import '../styles/pages/Feedback.css';

interface FeedbackFormData {
  overallRating: number;
  roomRating: number;
  serviceRating: number;
  cleanlinessRating: number;
  foodRating: number;
  valueRating: number;
  title: string;
  review: string;
  anonymous: boolean;
  likes: string[];
  improvements: string[];
}

const Feedback: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for quick feedback
  const [showQuickFeedbackForm, setShowQuickFeedbackForm] = useState<boolean>(false);
  const [quickFeedbackType, setQuickFeedbackType] = useState<string>('');
  const [quickFeedbackText, setQuickFeedbackText] = useState<string>('');
  
  // Form state
  const [formData, setFormData] = useState<FeedbackFormData>({
    overallRating: 0,
    roomRating: 0,
    serviceRating: 0,
    cleanlinessRating: 0,
    foodRating: 0,
    valueRating: 0,
    title: '',
    review: '',
    anonymous: false,
    likes: [],
    improvements: []
  });

  // Like and improvement tags
  const likeTags = [
    'location', 'staff', 'comfort', 'amenities', 
    'food', 'roomSize', 'cleanliness', 'value'
  ];
  
  const improvementTags = [
    'noise', 'bathroom', 'wifi', 'ac', 
    'foodQuality', 'checkIn', 'roomService', 'pricing'
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
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

  const handleRatingClick = (type: keyof FeedbackFormData, value: number): void => {
    setFormData(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleTagClick = (tag: string, type: 'likes' | 'improvements'): void => {
    setFormData(prev => {
      const currentTags = [...prev[type]];
      const index = currentTags.indexOf(tag);
      
      if (index === -1) {
        // Add tag
        return {
          ...prev,
          [type]: [...currentTags, tag]
        };
      } else {
        // Remove tag
        currentTags.splice(index, 1);
        return {
          ...prev,
          [type]: currentTags
        };
      }
    });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call an API to submit the feedback
      // For now, we'll simulate a successful submission
      setTimeout(() => {
        alert(t('feedback.submitReview'));
        navigate('/home');
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('common.error');
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleQuickFeedbackClick = (type: string): void => {
    setQuickFeedbackType(type);
    setShowQuickFeedbackForm(true);
  };

  const handleQuickFeedbackSubmit = (): void => {
    if (!quickFeedbackText.trim()) {
      alert(t('feedback.quickFeedbackPrompt'));
      return;
    }
    
    // In a real app, you would call an API to submit the quick feedback
    alert(t('feedback.sendFeedback'));
    setShowQuickFeedbackForm(false);
    setQuickFeedbackText('');
  };

  return (
    <div className="container">
      <FloatingLanguageSelector />
      
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">{t('feedback.title')}</h1>
        <p className="help-text text-center">{t('feedback.valueOpinion')}</p>
      </div>
      
      <Card>
        <h2 className="heading-secondary">{t('feedback.shareExperience')}</h2>
        <p className="help-text">{t('feedback.helpImprove')}</p>
        
        <form id="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t('feedback.overallExperience')}</label>
            <div className="rating-stars-input">
              {[1, 2, 3, 4, 5].map(star => (
                <div 
                  key={star}
                  className={`star ${formData.overallRating >= star ? 'active' : ''}`}
                  onClick={() => handleRatingClick('overallRating', star)}
                >
                  ★
                </div>
              ))}
              <input type="hidden" id="overallRating" value={formData.overallRating} />
            </div>
          </div>
          
          <div className="category-ratings">
            <div className="category-rating">
              <label>{t('feedback.categories.room')}</label>
              <div className="compact-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <div 
                    key={star}
                    className={`star ${formData.roomRating >= star ? 'active' : ''}`}
                    onClick={() => handleRatingClick('roomRating', star)}
                  >
                    ★
                  </div>
                ))}
                <input type="hidden" id="roomRating" value={formData.roomRating} />
              </div>
            </div>
            
            <div className="category-rating">
              <label>{t('feedback.categories.service')}</label>
              <div className="compact-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <div 
                    key={star}
                    className={`star ${formData.serviceRating >= star ? 'active' : ''}`}
                    onClick={() => handleRatingClick('serviceRating', star)}
                  >
                    ★
                  </div>
                ))}
                <input type="hidden" id="serviceRating" value={formData.serviceRating} />
              </div>
            </div>
            
            <div className="category-rating">
              <label>{t('feedback.categories.cleanliness')}</label>
              <div className="compact-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <div 
                    key={star}
                    className={`star ${formData.cleanlinessRating >= star ? 'active' : ''}`}
                    onClick={() => handleRatingClick('cleanlinessRating', star)}
                  >
                    ★
                  </div>
                ))}
                <input type="hidden" id="cleanlinessRating" value={formData.cleanlinessRating} />
              </div>
            </div>
            
            <div className="category-rating">
              <label>{t('feedback.categories.food')}</label>
              <div className="compact-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <div 
                    key={star}
                    className={`star ${formData.foodRating >= star ? 'active' : ''}`}
                    onClick={() => handleRatingClick('foodRating', star)}
                  >
                    ★
                  </div>
                ))}
                <input type="hidden" id="foodRating" value={formData.foodRating} />
              </div>
            </div>
            
            <div className="category-rating">
              <label>{t('feedback.categories.value')}</label>
              <div className="compact-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <div 
                    key={star}
                    className={`star ${formData.valueRating >= star ? 'active' : ''}`}
                    onClick={() => handleRatingClick('valueRating', star)}
                  >
                    ★
                  </div>
                ))}
                <input type="hidden" id="valueRating" value={formData.valueRating} />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="title">{t('feedback.reviewTitle')}</label>
            <input 
              type="text" 
              className="form-input" 
              id="title"
              placeholder={t('feedback.reviewTitlePrompt')}
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="review">{t('feedback.yourReview')}</label>
            <textarea 
              className="form-input" 
              id="review"
              placeholder={t('feedback.reviewPrompt')} 
              rows={4}
              value={formData.review}
              onChange={handleInputChange}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label">{t('feedback.likes')}</label>
            <div className="tag-selector">
              {likeTags.map(tag => (
                <div 
                  key={tag}
                  className={`tag ${formData.likes.includes(tag) ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag, 'likes')}
                >
                  {t(`feedback.likeTags.${tag}`)}
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">{t('feedback.improvements')}</label>
            <div className="tag-selector">
              {improvementTags.map(tag => (
                <div 
                  key={tag}
                  className={`tag ${formData.improvements.includes(tag) ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag, 'improvements')}
                >
                  {t(`feedback.improvementTags.${tag}`)}
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">{t('feedback.addPhotos')}</label>
            <div className="photo-upload">
              <Button variant="secondary" type="button">{t('feedback.uploadPhotos')}</Button>
            </div>
          </div>
          
          <div className="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="anonymous" 
              className="form-checkbox"
              checked={formData.anonymous}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="anonymous" className="checkbox-label">
              {t('feedback.anonymous')}
            </label>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <Button type="submit" loading={loading}>{t('feedback.submitReview')}</Button>
        </form>
      </Card>
      
      <Card>
        <h2 className="heading-secondary">{t('feedback.quickFeedback')}</h2>
        <p className="help-text">{t('feedback.quickFeedbackPrompt')}</p>
        
        <div className="quick-feedback-options">
          <button 
            className={`quick-feedback-btn ${quickFeedbackType === 'compliment' ? 'active' : ''}`}
            onClick={() => handleQuickFeedbackClick('compliment')}
          >
            <span className="feedback-icon">👏</span>
            <span>{t('feedback.feedbackTypes.compliment')}</span>
          </button>
          <button 
            className={`quick-feedback-btn ${quickFeedbackType === 'suggestion' ? 'active' : ''}`}
            onClick={() => handleQuickFeedbackClick('suggestion')}
          >
            <span className="feedback-icon">💡</span>
            <span>{t('feedback.feedbackTypes.suggestion')}</span>
          </button>
          <button 
            className={`quick-feedback-btn ${quickFeedbackType === 'issue' ? 'active' : ''}`}
            onClick={() => handleQuickFeedbackClick('issue')}
          >
            <span className="feedback-icon">⚠️</span>
            <span>{t('feedback.feedbackTypes.issue')}</span>
          </button>
        </div>
        
        {showQuickFeedbackForm && (
          <div className="quick-feedback-form">
            <textarea 
              className="form-input" 
              placeholder={`${t(`feedback.feedbackTypes.${quickFeedbackType}`)}...`} 
              rows={3}
              value={quickFeedbackText}
              onChange={(e) => setQuickFeedbackText(e.target.value)}
            ></textarea>
            <Button onClick={handleQuickFeedbackSubmit}>{t('feedback.sendFeedback')}</Button>
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

export default Feedback;