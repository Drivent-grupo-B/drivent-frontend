import api from './api';

export async function getDaysActivities(token) {
  const response = await api.get('/activities/day', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function getScheduleDay(token, dayId) {
  const response = await api.get(`/activities/day/${dayId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
