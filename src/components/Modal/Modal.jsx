import React from 'react';
import './Modal.css';
export function Modal({children,onClick}) {
 const  onModalClick = e => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };
    return (
      <div className="Overlay">
        <div className="Modal" onClick={onModalClick}>
          {children}
        </div>
      </div>
    );
  }



