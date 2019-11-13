import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <Container textAlign="center" style={{ marginTop: '3rem' }}>
    <Header />
    {children}
    <Footer />
  </Container>
);

export default Layout;
