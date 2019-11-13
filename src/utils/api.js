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
