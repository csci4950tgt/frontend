import React from 'react';
import { Header } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

const Ticket = () => {
  const { ticketID } = useParams();
  // TODO: add screenshot component in return function, pass down ticketID
  // through props
  return (
    <>
      <Header as="h3">Ticket: {ticketID}</Header>
    </>
  );
};

export default Ticket;
