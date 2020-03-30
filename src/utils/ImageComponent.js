import React, { Component } from 'react';
import { WithStore } from 'pure-react-carousel';
import { Modal, Image } from 'semantic-ui-react';

class ImageComponent extends Component {
  render() {
    return (
      <Modal.Content image>
        <Image
          alt="fullpage screenshot"
          src={this.props.images[this.props.currentSlide]}
          bordered
          centered
          fluid
        />
      </Modal.Content>
    );
  }
}

export default WithStore(ImageComponent, state => ({
  currentSlide: state.currentSlide,
}));
