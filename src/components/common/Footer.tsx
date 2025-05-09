// Reusable footer component
import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      &copy; {new Date().getFullYear()} Hotel Assistant
    </div>
  );
};

export default Footer;
