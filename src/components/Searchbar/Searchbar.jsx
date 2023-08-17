import {useState} from 'react';
import './Searchbar.css';
import PropTypes from 'prop-types';



function Searchbar ({onSubmit}) {
  const [searchQuery,setsearchQuery] = useState('')
  const handleQueryChange = event => {
    setsearchQuery( event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);
    setsearchQuery('');
  };

 
    return (
      <header className="searchbar">
        <form className="form" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            value={searchQuery}
            placeholder="Search images and photos"
            onChange={handleQueryChange}
          />
        </form>
      </header>
    );
  }

  
export default Searchbar;

Searchbar.propTypes={
onSubmit:PropTypes.func
}