// Notification.js
import React, { useEffect } from 'react';
import './Notification.css'; // Import the Notification CSS

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className={`notification-box ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;

