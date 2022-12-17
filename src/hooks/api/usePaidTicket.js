import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paidTicketApi.js';

export default function usePaidTickete() {
  const token = useToken();
  console.log(token);
  const {
    data: paidTicketData,
    loading: paidTicketLoading,
    error: paidTicketError,
    act: paid
  } = useAsync((value) => paymentApi.paidTicket(value, token), false);
  console.log(paidTicketData, paidTicketLoading, paidTicketError);

  return {
    paidTicketData,
    paidTicketLoading,
    paidTicketError,
    paid
  };
}
