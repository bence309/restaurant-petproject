// Notification.js
import React, { useEffect } from 'react';
import './Notification.css'; // Import the Notification styles

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="notification-box">
      <p>{message}</p>
    </div>
  );
};

export default Notification;
