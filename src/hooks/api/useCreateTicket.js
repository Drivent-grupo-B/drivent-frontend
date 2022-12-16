import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi.js';

export default function useCreateTicket() {
  const token = useToken();

  const {
    data: createdTicket,
    loading: createdTicketLoading,
    error: createdTicketError,
    act: postCreatedTicket
  } = useAsync((data) => ticketApi.postReservedTicket(data, token));

  return {
    createdTicket,
    createdTicketLoading,
    createdTicketError,
    postCreatedTicket
  };
}
