// src/pages/LostFound.tsx
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import FloatingLanguageSelector from '../components/common/FloatingLanguageSelector';
import '../styles/pages/LostFound.css';

type Tab = 'report-lost' | 'found-items' | 'my-reports';

interface LostItemFormData {
  itemName: string;
  description: string;
  category: string;
  lastLocation: string;
  lastSeenTime: string;
  contactNumber: string;
}

interface FoundItem {
  id: string;
  name: string;
  description: string;
  image: string;
  foundDate: string;
}

interface UserReport {
  id: string;
  title: string;
  date: string;
  description: string;
  status: 'pending' | 'found' | 'closed';
}

const LostFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('report-lost');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<LostItemFormData>({
    itemName: '',
    description: '',
    category: '',
    lastLocation: '',
    lastSeenTime: '',
    contactNumber: ''
  });

  // Mock data for found items
  const [foundItems] = useState<FoundItem[]>([
    {
      id: '1',
      name: 'Black Sunglasses',
      description: 'Ray-Ban style, found in the pool area',
      image: '/api/placeholder/200/200',
      foundDate: 'May 7, 2025'
    },
    {
      id: '2',
      name: 'Silver Watch',
      description: 'Metal band, analog face, found in the gym',
      image: '/api/placeholder/200/200',
      foundDate: 'May 5, 2025'
    },
    {
      id: '3',
      name: 'Room Key Card',
      description: 'Hotel key card found in the restaurant',
      image: '/api/placeholder/200/200',
      foundDate: 'May 8, 2025'
    }
  ]);
  
  // Mock data for user reports
  const [userReports] = useState<UserReport[]>([
    {
      id: '1',
      title: 'Blue Leather Wallet',
      date: 'May 6, 2025',
      description: 'Last seen in the hotel restaurant during dinner.',
      status: 'pending'
    }
  ]);

  const handleTabChange = (tab: Tab): void => {
    setActiveTab(tab);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call an API to submit the lost item report
      // For now, we'll simulate a successful submission
      setTimeout(() => {
        alert(t('lostFound.submitReport'));
        setActiveTab('my-reports');
        setLoading(false);
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('common.error');
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleClaimItem = (itemId: string, itemName: string): void => {
    alert(`${t('lostFound.claimItem')}: ${itemName}.`);
  };

  const handleViewReportDetails = (reportId: string): void => {
    alert(`${t('lostFound.viewDetails')} #${reportId}`);
  };

  const handleUpdateReport = (reportId: string): void => {
    alert(`${t('lostFound.update')} #${reportId}`);
  };

  return (
    <div className="container">
      <FloatingLanguageSelector />
      
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">{t('lostFound.title')}</h1>
      </div>
      
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'report-lost' ? 'active' : ''}`}
          onClick={() => handleTabChange('report-lost')}
        >
          {t('lostFound.reportLost')}
        </div>
        <div 
          className={`tab ${activeTab === 'found-items' ? 'active' : ''}`}
          onClick={() => handleTabChange('found-items')}
        >
          {t('lostFound.browseFound')}
        </div>
        <div 
          className={`tab ${activeTab === 'my-reports' ? 'active' : ''}`}
          onClick={() => handleTabChange('my-reports')}
        >
          {t('lostFound.myReports')}
        </div>
      </div>
      
      <div className="tab-content">
        {/* Report Lost Item Tab */}
        {activeTab === 'report-lost' && (
          <Card>
            <h2 className="heading-secondary">{t('lostFound.reportLost')}</h2>
            
            <form id="lost-item-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="itemName">{t('lostFound.itemNameType')}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  id="itemName" 
                  placeholder={t('lostFound.itemNamePrompt')} 
                  value={formData.itemName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="description">{t('lostFound.description')}</label>
                <textarea 
                  className="form-input" 
                  id="description" 
                  placeholder={t('lostFound.descriptionPrompt')} 
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="category">{t('lostFound.category')}</label>
                <select 
                  className="form-input" 
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>{t('lostFound.selectCategory')}</option>
                  <option value="electronics">{t('lostFound.categories.electronics')}</option>
                  <option value="wallet">{t('lostFound.categories.wallet')}</option>
                  <option value="clothing">{t('lostFound.categories.clothing')}</option>
                  <option value="jewelry">{t('lostFound.categories.jewelry')}</option>
                  <option value="keys">{t('lostFound.categories.keys')}</option>
                  <option value="documents">{t('lostFound.categories.documents')}</option>
                  <option value="other">{t('lostFound.categories.other')}</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="lastLocation">{t('lostFound.lastLocation')}</label>
                <select 
                  className="form-input" 
                  id="lastLocation"
                  value={formData.lastLocation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>{t('lostFound.selectLocation')}</option>
                  <option value="room">{t('lostFound.locations.room')}</option>
                  <option value="restaurant">{t('lostFound.locations.restaurant')}</option>
                  <option value="lobby">{t('lostFound.locations.lobby')}</option>
                  <option value="pool">{t('lostFound.locations.pool')}</option>
                  <option value="spa">{t('lostFound.locations.spa')}</option>
                  <option value="gym">{t('lostFound.locations.gym')}</option>
                  <option value="other">{t('lostFound.locations.other')}</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="lastSeenTime">{t('lostFound.lastSeenTime')}</label>
                <input 
                  type="datetime-local" 
                  className="form-input" 
                  id="lastSeenTime"
                  value={formData.lastSeenTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{t('lostFound.addPhoto')}</label>
                <div className="photo-upload">
                  <Button variant="secondary" type="button">{t('lostFound.uploadPhoto')}</Button>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="contactNumber">{t('lostFound.contactNumber')}</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  id="contactNumber" 
                  placeholder={t('lostFound.contactNumberPrompt')}
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                />
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <Button type="submit" loading={loading}>{t('lostFound.submitReport')}</Button>
            </form>
          </Card>
        )}
        
        {/* Browse Found Items Tab */}
        {activeTab === 'found-items' && (
          <Card>
            <h2 className="heading-secondary">{t('lostFound.recentlyFound')}</h2>
            <p className="help-text">{t('lostFound.claimInstructions')}</p>
            
            <div className="filter-controls">
              <div className="filter-group">
                <label>{t('lostFound.filterBy')}</label>
                <select className="form-input" id="found-filter">
                  <option value="all">{t('localAttractions.filters.all')}</option>
                  <option value="electronics">{t('lostFound.categories.electronics')}</option>
                  <option value="wallet">{t('lostFound.categories.wallet')}</option>
                  <option value="clothing">{t('lostFound.categories.clothing')}</option>
                  <option value="jewelry">{t('lostFound.categories.jewelry')}</option>
                  <option value="keys">{t('lostFound.categories.keys')}</option>
                  <option value="documents">{t('lostFound.categories.documents')}</option>
                  <option value="other">{t('lostFound.categories.other')}</option>
                </select>
              </div>
              <div className="search-box">
                <input type="text" className="form-input" placeholder={t('lostFound.searchItems')} id="found-search" />
              </div>
            </div>
            
            <div className="found-items-grid">
              {foundItems.map(item => (
                <div className="found-item-card" key={item.id}>
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <p className="item-date">{t('lostFound.found')}: {item.foundDate}</p>
                    <Button onClick={() => handleClaimItem(item.id, item.name)}>
                      {t('lostFound.claimItem')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
        
        {/* My Reports Tab */}
        {activeTab === 'my-reports' && (
          <Card>
            <h2 className="heading-secondary">{t('lostFound.yourReports')}</h2>
            
            <div className="reports-list">
              {userReports.length > 0 ? (
                userReports.map(report => (
                  <div className="report-item" key={report.id}>
                    <div className={`report-status ${report.status}`}>
                      {t(`lostFound.reportStatus.${report.status}`)}
                    </div>
                    <div className="report-content">
                      <h3 className="report-title">{report.title}</h3>
                      <p className="report-date">{t('lostFound.reportLost')}: {report.date}</p>
                      <p className="report-description">{report.description}</p>
                    </div>
                    <div className="report-actions">
                      <button 
                        className="btn btn-text"
                        onClick={() => handleViewReportDetails(report.id)}
                      >
                        {t('lostFound.viewDetails')}
                      </button>
                      <button 
                        className="btn btn-text"
                        onClick={() => handleUpdateReport(report.id)}
                      >
                        {t('lostFound.update')}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-reports-message">
                  <p>{t('lostFound.noReports')}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
      
      <Button variant="text" onClick={() => navigate('/home')}>
        ← {t('common.backHome')}
      </Button>
      
      <Footer />
    </div>
  );
};

export default LostFound;