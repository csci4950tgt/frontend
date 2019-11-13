import React from 'react';
import { Link } from 'react-router-dom';
import { Header as SemanticHeader } from 'semantic-ui-react';

const Header = () => (
  <div style={{ marginBottom: '2rem' }}>
    <SemanticHeader as={Link} to="/" color="blue" style={{ fontSize: '2rem' }}>
      Vigilante Web Heist
    </SemanticHeader>
  </div>
);

export default Header;
