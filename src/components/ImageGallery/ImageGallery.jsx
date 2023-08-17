import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.css';
import { useEffect, useState } from 'react';
import { getFetch } from 'services/getFetch';
import Button from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

function ImageGallery({ query }) {
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (query === '') {
        return;
      }
      setStatus('pending');
      setPage(1);
      try {
        const { hits, totalHits } = await getFetch(query, 1);

        if (totalHits === 0) {
          throw new Error(`No results found for your query "${query}"`);
        }
        setHits(hits);
        setTotalHits(totalHits);
        setStatus('resolved');
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    };

    fetchData();
  }, [query]);

  useEffect(() => {
    const loadMoreData = async () => {
      if (page > 1) {
        const { hits } = await getFetch(query, page);

        setHits(prevHits => [...prevHits, ...hits]);
      }
    };

    loadMoreData();
  }, [page, query]);

  const handleLoadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === 'idle') {
    return (
      <div className="preview">
        <h2>Please enter a search query</h2>
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <div>
        <Loader />
        Loading...
      </div>
    );
  }
  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }
  if (status === 'resolved') {
    return (
      <div>
        <ul className="ImageGallery">
          {hits.map(el => {
            return <ImageGalleryItem element={el} key={el.id} />;
          })}
        </ul>
        {page < Math.ceil(totalHits / 12) && (
          <Button handleBtnClick={handleLoadMoreBtnClick} />
        )}
      </div>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  query: PropTypes.string,
};
