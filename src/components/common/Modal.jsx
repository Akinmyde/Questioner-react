import React from 'react';

const Modal = ({ message, onDelete, onCancel }) => {
  return (
    <div className="modal show-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onCancel}>&times;</span>
        <p className="msg">{message}</p>
        <div>
          <button className="btn-modal btn-yes" onClick={onDelete}>Yes</button>
          <button className="btn-modal btn-no" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}
 
export default Modal;