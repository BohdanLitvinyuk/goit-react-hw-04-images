import React from 'react';
import './ImageGalleryItem.css';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
  };

  handleModalClick = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
  }
  onEscClick = e => {
    if (e.code === 'Escape') {
      this.setState({ showModal: false });
    }
  };
  render() {
    const {webformatURL, tags, largeImageURL}= this.props.el;
      return (
        <li className="gallery-item" >
          <img src={webformatURL} alt={tags} onClick={this.handleModalClick} />
          {this.state.showModal && (
            <Modal  >
              <img src={largeImageURL} alt={tags} onClick={this.handleModalClick}/>
            </Modal>
          )}
        </li>
      );
    };
  }

ImageGalleryItem.propTypes = {
  hits: PropTypes.array,
  webformatURL: PropTypes.string,
  id: PropTypes.string,
  tags: PropTypes.string,
};
