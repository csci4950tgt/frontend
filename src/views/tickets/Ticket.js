import React from 'react';
import { Header } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import Screenshot from './Screenshot';

const Ticket = () => {
  const { ticketID, url } = useParams();
  return (
    <>
      <Screenshot ticketID={ticketID} url={url} />
    </>
  );
};

export default Ticket;
