import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoomServiceMenu, placeRoomServiceOrder } from '../api/roomServiceApi';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Footer from '../components/common/Footer';
import { Menu, MenuItem } from '../types';
import '../styles/pages/RoomService.css';

interface OrderItem extends MenuItem {
  id: string;
}

const RoomService: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [menu, setMenu] = useState<Menu>({});
  const [activeTab, setActiveTab] = useState<string>('breakfast');
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [orderTotal, setOrderTotal] = useState<number>(0);

  useEffect(() => {
    // Fetch room service menu
    const fetchMenu = async (): Promise<void> => {
      try {
        const menuData = await getRoomServiceMenu();
        setMenu(menuData);
        // Set default active tab to first menu section
        if (menuData && Object.keys(menuData).length > 0) {
          setActiveTab(Object.keys(menuData)[0]);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load menu';
        setError(errorMessage);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Calculate total whenever order changes
  useEffect(() => {
    const total = order.reduce((sum, item) => sum + item.price, 0);
    setOrderTotal(total);
  }, [order]);

  const handleAddItem = (item: MenuItem): void => {
    const orderItem: OrderItem = {
      ...item,
      id: `${item.id}-${Date.now()}`
    };
    setOrder(prev => [...prev, orderItem]);
  };

  const handleRemoveItem = (id: string): void => {
    setOrder(prev => prev.filter(item => item.id !== id));
  };

  const handlePlaceOrder = async (): Promise<void> => {
    if (order.length === 0) {
      alert('Please add items to your order.');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: order.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        })),
        total: orderTotal,
        specialInstructions: ''
      };

      const response = await placeRoomServiceOrder(orderData);
      
      if (response.success) {
        alert('Your order has been placed!');
        navigate('/food-dining');
      } else {
        throw new Error(response.message || 'Failed to place order');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to place order';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = (): void => {
    navigate('/food-dining');
  };

  if (loading && Object.keys(menu).length === 0) {
    return (
      <div className="container">
        <div className="logo-area">
          <LogoPlaceholder />
        </div>
        <Card>
          <div className="loading">Loading menu...</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">Room Service Menu</h1>
      </div>
      
      {error && <div className="error-message card">{error}</div>}
      
      <div className="menu-tabs">
        {menu && Object.keys(menu).map(category => (
          <div 
            key={category}
            className={`menu-tab ${activeTab === category ? 'active' : ''}`}
            onClick={() => setActiveTab(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
        ))}
      </div>
      
      <div className="menu-content">
        {menu && menu[activeTab] && (
          <div className="menu-section">
            <h2 className="heading-secondary">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Menu
            </h2>
            <p className="help-text">{menu[activeTab].availableTime}</p>
            
            <div className="menu-items">
              {menu[activeTab].items.map(item => (
                <div key={item.id} className="menu-item">
                  <div className="menu-item-content">
                    <h3 className="menu-item-title">{item.name}</h3>
                    <p className="menu-item-description">{item.description}</p>
                    <p className="menu-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <button 
                    className="btn-add-item"
                    onClick={() => handleAddItem(item)}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="order-summary">
        <h2 className="heading-secondary">Your Order</h2>
        <div className="order-items">
          {order.length === 0 ? (
            <p className="empty-order-message">Your order is empty. Add items from the menu.</p>
          ) : (
            order.map(item => (
              <div key={item.id} className="order-item">
                <div className="order-item-title">{item.name}</div>
                <div className="order-item-price">${item.price.toFixed(2)}</div>
                <button 
                  className="btn-remove-item"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        
        <div className="order-total">
          <div className="total-label">Total:</div>
          <div className="total-amount">${orderTotal.toFixed(2)}</div>
        </div>
        
        <Button 
          onClick={handlePlaceOrder} 
          loading={loading}
          disabled={order.length === 0}
        >
          Place Order
        </Button>
      </div>
      
      <Button variant="text" onClick={handleBackClick}>
        ← Back to Food Options
      </Button>
      
      <Footer />
    </div>
  );
};

export default RoomService;