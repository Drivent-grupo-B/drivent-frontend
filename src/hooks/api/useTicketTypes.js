import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketTypesApi.js';

export default function useTicketTipe() {
  const token = useToken();
  
  const {
    data: ticketTypes,
    loading: ticketLoading,
    error: ticketError,
    act: getTicketTypes
  } = useAsync(() => ticketApi.getTicketTypes(token));

  return {
    ticketTypes,
    ticketLoading,
    ticketError,
    getTicketTypes
  };
}
