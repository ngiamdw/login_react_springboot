import axios from 'axios';

const API_URL = 'http://localhost:8080';

const apiService = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const loginUser = (user) => {
  return apiService.post('/login', user);
};

export const managerPage = (userId) => {
  return apiService.get(`/managerPage?userId=${userId}`);
};

export const logoutUser = (userId) => {
  return apiService.get(`/logout?userId=${userId}`);
};
