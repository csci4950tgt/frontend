import React, { Component } from 'react';
import { WithStore } from 'pure-react-carousel';
import { Modal } from 'semantic-ui-react';

class TextComponent extends Component {
  render() {
    return (
      <Modal.Content text="true" style={{ whiteSpace: 'pre' }}>
        {this.props.ocrText[this.props.currentSlide]}
      </Modal.Content>
    );
  }
}

export default WithStore(TextComponent, state => ({
  currentSlide: state.currentSlide,
}));
