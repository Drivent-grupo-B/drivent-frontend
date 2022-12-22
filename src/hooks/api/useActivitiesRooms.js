import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivitiesRooms() {
  const token = useToken();

  const {
    data: activitiesRooms,
    loading: activitiesRoomsLoading,
    error: activitiesRoomsError,
    act: getActivitiesRooms
  } = useAsync(() => activitiesApi.getActivitiesRoom(token));

  return {
    activitiesRooms,
    activitiesRoomsLoading,
    activitiesRoomsError,
    getActivitiesRooms
  };
}
