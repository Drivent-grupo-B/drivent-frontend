import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivitiesDays() {
  const token = useToken();

  const {
    data: days,
    loading: daysLoading,
    error: daysError,
    act: getDaysActivities
  } = useAsync(() => activitiesApi.getDaysActivities(token));

  return {
    days,
    daysLoading,
    daysError,
    getDaysActivities
  };
}
