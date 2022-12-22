import useAsync from '../useAsync';
import useToken from '../useToken';
import * as bookingApi from '../../services/bookingApi.js';

export default function useUpsertBooking() {
  const token = useToken();

  const {
    data: newBooking,
    loading: newBookingLoading,
    error: newBookingError,
    act: postNewBooking
  } = useAsync((data) => bookingApi.createOrUpdateBooking(data, token), false);

  return {
    newBooking,
    newBookingLoading,
    newBookingError,
    postNewBooking
  };
}
