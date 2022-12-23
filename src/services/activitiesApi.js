import api from './api';

export async function getDaysActivities(token) {
  const response = await api.get('/activities/day', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function getActivities(token, dayId) {
  const response = await api.get(`/activities/day/${dayId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function getActivitiesRoom(token, dayId) {
  const response = await api.get('/activities/rooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function createEntry(body, token) {
  const response = await api.post('/activities/entry', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
