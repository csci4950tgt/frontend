export const fetchTicket = async ticketID => {
  try {
    const res = await fetch(`/api/tickets/${ticketID}`, {
      method: 'GET',
    });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const createTicket = async body => {
  try {
    const res = await fetch('/api/tickets', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: body, // body data type must match "Content-Type" header'
    });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
