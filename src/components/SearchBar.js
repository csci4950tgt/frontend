import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  state = { term: '' };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <label>Search Bar</label>
        <input
          type="text"
          value={this.state.term}
          onChange={e => this.setState({ term: e.target.value })}
        />
      </form>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;
