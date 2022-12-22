import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivities(dayId) {
  const token = useToken();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getactivitiesActivities
  } = useAsync(() => activitiesApi.getActivities(token, dayId));

  return {
    activities,
    activitiesLoading,
    activitiesError,
    getactivitiesActivities
  };
}
