import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div style={{ marginBottom: '2rem' }}>
    <Header as={Link} to="/" color="blue" style={{ fontSize: '2rem' }}>
      Vigilante Web Heist
    </Header>
  </div>
);

const Layout = ({ children }) => (
  <Container textAlign="center" style={{ marginTop: '3rem' }}>
    <Nav />
    {children}
  </Container>
);

export default Layout;
