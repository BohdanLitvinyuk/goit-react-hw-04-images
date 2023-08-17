import React from 'react';
import './Searchbar.css';
import PropTypes from 'prop-types';



class Searchbar extends React.Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.searchQuery}
            placeholder="Search images and photos"
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;

Searchbar.propTypes={
onSubmit:PropTypes.func
}