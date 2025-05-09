// Component for option cards on the home screen
import React from 'react';

interface OptionCardProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ id, icon, title, description, onClick }) => {
  return (
    <div className="option-card" id={id} onClick={onClick}>
      <div className="option-icon">{icon}</div>
      <div className="option-content">
        <h3 className="option-title">{title}</h3>
        <p className="option-description">{description}</p>
      </div>
    </div>
  );
};

export default OptionCard;