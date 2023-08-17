import Searchbar from './Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchBarSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const appStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '16px',
    paddingBottom: '24px',
  };
  return (
    <div style={appStyles}>
      <Searchbar onSubmit={handleSearchBarSubmit} />
      <ImageGallery query={searchQuery} />
    </div>
  );
}
