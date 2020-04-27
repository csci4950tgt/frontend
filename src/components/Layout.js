import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import Footer from './Footer';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <Container textAlign="center" style={{ marginTop: '3rem' }}>
    <Header />
    {children}
    <Footer />
  </Container>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
