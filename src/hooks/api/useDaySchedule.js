import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activitiesApi from '../../services/activitiesApi.js';

export default function useDaySchedule(dayId) {
  const token = useToken();
  const {    
    data: scheduleDay,
    loading: scheduleDayLoading,
    error: scheduleDayError,
    act: daySchedule
  } = useAsync(() => activitiesApi.getScheduleDay(token, dayId) );
  
  return {
    scheduleDay,
    scheduleDayLoading,
    scheduleDayError,
    daySchedule
  };
}
