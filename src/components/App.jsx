import Searchbar from './Searchbar/Searchbar';
import React from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
// import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
export class App extends React.Component {
  state = {
    searchQuery: '',
   
  };

  

  handleSearchBarSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const appStyles = {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: '16px',
      paddingBottom: '24px',
    };
    return (
      <div style={appStyles}>
        <Searchbar onSubmit={this.handleSearchBarSubmit} />
        <ImageGallery query={this.state.searchQuery} />
      
      </div>
    );
  }
}
