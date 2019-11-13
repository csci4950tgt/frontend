export const fetchTicket = async ticketID => {
  try {
    const res = await fetch(`/api/tickets/${ticketID}`);
    // handle bad error codes
    if (res.status !== 200) {
      console.error(res);
      return null;
    }
    // we made it this far, good to return json
    return await res.json();
  } catch (error) {
    // handle error
    console.error(error);
    return null;
  }
};

export const createTicket = async body => {
  try {
    // fetch from backend
    const res = await fetch('/api/tickets', {
      method: 'POST',
      body,
    });
    // handle bad error codes
    if (res.status !== 200) {
      console.error(res);
      return null;
    }
    // we made it this far, good to return json
    return await res.json();
  } catch (error) {
    // handle error
    console.error(error);
    return null;
  }
};
