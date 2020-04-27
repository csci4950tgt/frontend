import React, { Component } from 'react';
import { WithStore } from 'pure-react-carousel';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class TextComponent extends Component {
  render() {
    return (
      <Modal.Content text="true" style={{ whiteSpace: 'pre' }}>
        {this.props.ocrText[this.props.currentSlide]}
      </Modal.Content>
    );
  }
}

TextComponent.propTypes = {
  ocrText: PropTypes.array,
  currentSlide: PropTypes.string,
};

export default WithStore(TextComponent, state => ({
  currentSlide: state.currentSlide,
}));
