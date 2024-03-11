
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faClone, faUpload, faDownload, faPlus } from '@fortawesome/free-solid-svg-icons';
import "./popover.css";

const Popover = ({  closePopover, selectedItemIndex, popoverPosition, deleteItem }) => {
  return (
    <div className="popover-overlay" onClick={closePopover}>
    <div className="popover" style={{ top: popoverPosition.top, left: popoverPosition.left - 70, position: 'absolute' }}>
      <div className="popover-content">
        <ul>
          <li onClick={() => deleteItem(selectedItemIndex)}>
            <FontAwesomeIcon icon={faTrashAlt} />
            Delete
          </li>
          <li>
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </li>
          <li>
            <FontAwesomeIcon icon={faClone} />
            Clone
          </li>
          <li>
            <FontAwesomeIcon icon={faUpload} />
            Publish
          </li>
          <li>
            <FontAwesomeIcon icon={faDownload} />
            Unpublish
          </li>
          <li>
            <FontAwesomeIcon icon={faPlus} />
            Add to Release
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
};

export default Popover;
