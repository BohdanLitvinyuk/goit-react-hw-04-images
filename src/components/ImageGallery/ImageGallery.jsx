import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.css';
import React from 'react';
import { getFetch } from 'services/getFetch';
import Button from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

class ImageGallery extends React.Component {
  state = {
    hits: [],
    totalHits: 0,
    error: null,
    status: 'idle',
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const newQuery = this.props.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    if (newQuery !== prevQuery)
      try {
        this.setState({ status: 'pending' ,page: 1});
        const { hits, totalHits } = await getFetch(newQuery, nextPage);
        if (totalHits === 0) {
          throw new Error(`No results found for your query "${newQuery}"`);
        }
        this.setState({ hits, totalHits, status: 'resolved' });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    if (prevPage !== nextPage) {
      const { hits } = await getFetch(newQuery, nextPage);
      this.setState({ hits: [...prevState.hits, ...hits] });
    }
  }

  handleLoadMoreBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    getFetch();
  };

  render() {
    const { hits, error, status } = this.state;
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
            {hits.map(el=>{
              return <ImageGalleryItem el={el} key={el.id} />
            })}
            
          </ul>
          {this.state.page < Math.ceil(this.state.totalHits / 12) && (
            <Button handleBtnClick={this.handleLoadMoreBtnClick} />
          )}
        </div>
      );
    }
  }
}

export default ImageGallery;

ImageGallery.propTypes={
query:PropTypes.string
}