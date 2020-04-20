import React, { Component } from 'react';
import { WithStore } from 'pure-react-carousel';
import { Modal, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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

ImageComponent.propTypes = {
  images: PropTypes.array,
  currentSlide: PropTypes.string,
};

export default WithStore(ImageComponent, state => ({
  currentSlide: state.currentSlide,
}));
