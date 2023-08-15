import React from 'react';
import './Modal.css';
export class Modal extends React.Component {
  onModalClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClick();
    }
  };
  render() {
    return (
      <div className="Overlay">
        <div className="Modal" onClick={this.onModalClick}>
          {' '}
          {this.props.children}{' '}
        </div>
      </div>
    );
  }
}

//
