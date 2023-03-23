import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLessons = () => {
  return instance.get('/api/lessons/')
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
};

export const getLesson = (id) => {
  return instance.get(`/api/lessons/${id}/`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
};

export const createLesson = (data) => {
  return instance.post('/api/lessons/', data)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
};

export const updateLesson = (id, data) => {
  return instance.put(`/api/lessons/${id}/`, data)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
};

export const deleteLesson = (id) => {
  return instance.delete(`/api/lessons/${id}/`)
    .then(response => response)
    .catch(error => {
        throw new Error(error);
    });
}