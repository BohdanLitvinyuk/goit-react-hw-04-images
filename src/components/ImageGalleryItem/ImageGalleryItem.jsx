import { useState, useEffect } from 'react';
import './ImageGalleryItem.css';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem({ element }) {
  const [showModal, setShowModal] = useState(false);

  const handleModalClick = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const onEscClick = e => {
      if (e.code === 'Escape') {
        setShowModal(false);
      }
    };

    window.addEventListener('keydown', onEscClick);
    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  }, []);

  const { webformatURL, tags, largeImageURL } = element;

  return (
    <li className="gallery-item">
      <img src={webformatURL} alt={tags} onClick={handleModalClick} />
      {showModal && (
        <Modal>
          <img src={largeImageURL} alt={tags} onClick={handleModalClick} />
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  hits: PropTypes.array,
  webformatURL: PropTypes.string,
  id: PropTypes.string,
  tags: PropTypes.string,
};
