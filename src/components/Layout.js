import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import Footer from './Footer';
import Add from './Add';

const Layout = ({ children }) => (
  <Container textAlign="center" style={{ marginTop: '3rem' }}>
    <Header />
    {children}
    <Footer />
    <div className="App">
      <header className="App-header">
        <Add />
      </header>
    </div>
  </Container>
);

export default Layout;
