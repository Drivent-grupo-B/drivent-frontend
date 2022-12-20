import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paidTicketApi.js';

export default function usePaidTicket() {
  const token = useToken();
  const {
    data: paidTicketData,
    loading: paidTicketLoading,
    error: paidTicketError,
    act: paid
  } = useAsync((value) => paymentApi.paidTicket(value, token), false);

  return {
    paidTicketData,
    paidTicketLoading,
    paidTicketError,
    paid
  };
}
