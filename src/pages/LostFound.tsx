import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
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
        alert('Your lost item report has been submitted.');
        setActiveTab('my-reports');
        setLoading(false);
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleClaimItem = (itemId: string, itemName: string): void => {
    alert(`You have claimed: ${itemName}. Please visit the reception to collect it.`);
  };

  const handleViewReportDetails = (reportId: string): void => {
    alert(`Viewing details for report #${reportId}`);
  };

  const handleUpdateReport = (reportId: string): void => {
    alert(`Update report #${reportId}`);
  };

  return (
    <div className="container">
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">Lost & Found</h1>
      </div>
      
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'report-lost' ? 'active' : ''}`}
          onClick={() => handleTabChange('report-lost')}
        >
          Report Lost Item
        </div>
        <div 
          className={`tab ${activeTab === 'found-items' ? 'active' : ''}`}
          onClick={() => handleTabChange('found-items')}
        >
          Browse Found Items
        </div>
        <div 
          className={`tab ${activeTab === 'my-reports' ? 'active' : ''}`}
          onClick={() => handleTabChange('my-reports')}
        >
          My Reports
        </div>
      </div>
      
      <div className="tab-content">
        {/* Report Lost Item Tab */}
        {activeTab === 'report-lost' && (
          <Card>
            <h2 className="heading-secondary">Report a Lost Item</h2>
            
            <form id="lost-item-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="itemName">Item Name/Type</label>
                <input 
                  type="text" 
                  className="form-input" 
                  id="itemName" 
                  placeholder="e.g. Black Wallet, Sunglasses" 
                  value={formData.itemName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea 
                  className="form-input" 
                  id="description" 
                  placeholder="Please describe the item in detail (color, brand, distinctive features)" 
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="category">Category</label>
                <select 
                  className="form-input" 
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="wallet">Wallet/Purse</option>
                  <option value="clothing">Clothing</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="keys">Keys</option>
                  <option value="documents">Documents</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="lastLocation">Last Seen Location</label>
                <select 
                  className="form-input" 
                  id="lastLocation"
                  value={formData.lastLocation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Location</option>
                  <option value="room">My Room</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="lobby">Lobby</option>
                  <option value="pool">Pool Area</option>
                  <option value="spa">Spa</option>
                  <option value="gym">Fitness Center</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="lastSeenTime">Last Seen Date/Time</label>
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
                <label className="form-label">Add Photo of Item (if available)</label>
                <div className="photo-upload">
                  <Button variant="secondary" type="button">Upload Photo</Button>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="contactNumber">Contact Number</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  id="contactNumber" 
                  placeholder="Your phone number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                />
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <Button type="submit" loading={loading}>Submit Report</Button>
            </form>
          </Card>
        )}
        
        {/* Browse Found Items Tab */}
        {activeTab === 'found-items' && (
          <Card>
            <h2 className="heading-secondary">Recently Found Items</h2>
            <p className="help-text">These items have been turned in to our Lost & Found department. If you see your item, please claim it.</p>
            
            <div className="filter-controls">
              <div className="filter-group">
                <label>Filter by:</label>
                <select className="form-input" id="found-filter">
                  <option value="all">All Items</option>
                  <option value="electronics">Electronics</option>
                  <option value="wallet">Wallet/Purse</option>
                  <option value="clothing">Clothing</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="keys">Keys</option>
                  <option value="documents">Documents</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="search-box">
                <input type="text" className="form-input" placeholder="Search items..." id="found-search" />
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
                    <p className="item-date">Found: {item.foundDate}</p>
                    <Button onClick={() => handleClaimItem(item.id, item.name)}>
                      Claim This Item
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
            <h2 className="heading-secondary">Your Reports</h2>
            
            <div className="reports-list">
              {userReports.length > 0 ? (
                userReports.map(report => (
                  <div className="report-item" key={report.id}>
                    <div className={`report-status ${report.status}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </div>
                    <div className="report-content">
                      <h3 className="report-title">{report.title}</h3>
                      <p className="report-date">Reported: {report.date}</p>
                      <p className="report-description">{report.description}</p>
                    </div>
                    <div className="report-actions">
                      <button 
                        className="btn btn-text"
                        onClick={() => handleViewReportDetails(report.id)}
                      >
                        View Details
                      </button>
                      <button 
                        className="btn btn-text"
                        onClick={() => handleUpdateReport(report.id)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-reports-message">
                  <p>You haven't reported any lost items yet.</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
      
      <Button variant="text" onClick={() => navigate('/home')}>
        ← Back to Home
      </Button>
      
      <Footer />
    </div>
  );
};

export default LostFound;