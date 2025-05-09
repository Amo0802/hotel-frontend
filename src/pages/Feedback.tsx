import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
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

interface QuickFeedback {
  type: string;
  text: string;
}

const Feedback: React.FC = () => {
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
  const likeTags = ['Location', 'Staff', 'Comfort', 'Amenities', 'Food', 'Room Size', 'Cleanliness', 'Value'];
  const improvementTags = ['Noise', 'Bathroom', 'WiFi', 'Air Conditioning', 'Food Quality', 'Check-in Process', 'Room Service', 'Pricing'];

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
        alert('Thank you for your feedback!');
        navigate('/home');
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
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
      alert('Please enter your feedback.');
      return;
    }
    
    // In a real app, you would call an API to submit the quick feedback
    alert('Thank you for your feedback!');
    setShowQuickFeedbackForm(false);
    setQuickFeedbackText('');
  };

  return (
    <div className="container">
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">Feedback & Reviews</h1>
        <p className="help-text text-center">We value your opinion</p>
      </div>
      
      <Card>
        <h2 className="heading-secondary">Share Your Experience</h2>
        <p className="help-text">Your feedback helps us improve. Please rate your stay and share your thoughts.</p>
        
        <form id="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Overall Experience</label>
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
              <label>Room Quality</label>
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
              <label>Service</label>
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
              <label>Cleanliness</label>
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
              <label>Food & Dining</label>
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
              <label>Value for Money</label>
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
            <label className="form-label" htmlFor="title">Review Title</label>
            <input 
              type="text" 
              className="form-input" 
              id="title"
              placeholder="Summarize your experience"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="review">Your Review</label>
            <textarea 
              className="form-input" 
              id="review"
              placeholder="Tell us more about your stay" 
              rows={4}
              value={formData.review}
              onChange={handleInputChange}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label">What did you like most?</label>
            <div className="tag-selector">
              {likeTags.map(tag => (
                <div 
                  key={tag}
                  className={`tag ${formData.likes.includes(tag) ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag, 'likes')}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">What could be improved?</label>
            <div className="tag-selector">
              {improvementTags.map(tag => (
                <div 
                  key={tag}
                  className={`tag ${formData.improvements.includes(tag) ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag, 'improvements')}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Add Photos (Optional)</label>
            <div className="photo-upload">
              <Button variant="secondary" type="button">Upload Photos</Button>
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
              Submit anonymously
            </label>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <Button type="submit" loading={loading}>Submit Review</Button>
        </form>
      </Card>
      
      <Card>
        <h2 className="heading-secondary">Quick Feedback</h2>
        <p className="help-text">Have a specific comment or suggestion? Let us know.</p>
        
        <div className="quick-feedback-options">
          <button 
            className={`quick-feedback-btn ${quickFeedbackType === 'compliment' ? 'active' : ''}`}
            onClick={() => handleQuickFeedbackClick('compliment')}
          >
            <span className="feedback-icon">👏</span>
            <span>Compliment</span>
          </button>
          <button 
            className={`quick-feedback-btn ${quickFeedbackType === 'suggestion' ? 'active' : ''}`}
            onClick={() => handleQuickFeedbackClick('suggestion')}
          >
            <span className="feedback-icon">💡</span>
            <span>Suggestion</span>
          </button>
          <button 
            className={`quick-feedback-btn ${quickFeedbackType === 'issue' ? 'active' : ''}`}
            onClick={() => handleQuickFeedbackClick('issue')}
          >
            <span className="feedback-icon">⚠️</span>
            <span>Issue</span>
          </button>
        </div>
        
        {showQuickFeedbackForm && (
          <div className="quick-feedback-form">
            <textarea 
              className="form-input" 
              placeholder={`Tell us about your ${quickFeedbackType}...`} 
              rows={3}
              value={quickFeedbackText}
              onChange={(e) => setQuickFeedbackText(e.target.value)}
            ></textarea>
            <Button onClick={handleQuickFeedbackSubmit}>Send Feedback</Button>
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

export default Feedback;