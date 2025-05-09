// Component for status notifications on the home screen
import React from 'react';

interface StatusNotificationProps {
  type: 'cleaning' | 'maintenance' | 'food' | 'dnd';
  title: string;
  time: string;
  actionText?: string;
  onAction: () => void;
}

const StatusNotification: React.FC<StatusNotificationProps> = ({ 
  type, 
  title, 
  time, 
  actionText = 'View',
  onAction 
}) => {
  const getIcon = (type: string): string => {
    switch (type) {
      case 'cleaning': return '🧹';
      case 'maintenance': return '🔧';
      case 'food': return '🍽️';
      case 'dnd': return '🔕';
      default: return '📌';
    }
  };

  return (
    <div className="status-notification active">
      <div className={`status-icon ${type}`}>
        {getIcon(type)}
      </div>
      <div className="status-content">
        <p className="status-title">{title}</p>
        <p className="status-time">
          {time.includes('Requested') ? time : `Requested at ${time}`}
        </p>
      </div>
      <div className="status-action" onClick={onAction}>{actionText}</div>
    </div>
  );
};

export default StatusNotification;