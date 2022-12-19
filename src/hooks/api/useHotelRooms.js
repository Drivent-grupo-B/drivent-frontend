import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelRoomsApi from '../../services/roomApi.js';

export default function useHotelRooms(hotelId) {
  const token = useToken();
  
  const {
    data: rooms,
    loading: roomsLoading,
    error: roomsError,
    act: getRooms
  } = useAsync(() => hotelRoomsApi.getHotelsRooms(token, hotelId));

  return {
    rooms,
    roomsLoading,
    roomsError,
    getRooms
  };
}
