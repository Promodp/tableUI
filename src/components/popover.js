
import React from 'react';
import './popover.css';

const Popover = ({ isVisible, onClose, onDelete }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="popover">
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Popover;
