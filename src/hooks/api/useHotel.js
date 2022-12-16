import useAsync from '../useAsync';
import useToken from '../useToken';

// import * as paymentApi from '../../services/paymentApi.js';

// export default function usePayment() {
//   const token = useToken();
  
//   const {
//     data: ticketTypes,
//     loading: ticketTypesLoading,
//     error: ticketTypesError,
//     act: getTicketTypes
//   } = useAsync(() => paymentApi.getTicketTypes(token));

//   return {
//     ticketTypes,
//     ticketTypesLoading,
//     ticketTypesError,
//     getTicketTypes
//   };
// }
