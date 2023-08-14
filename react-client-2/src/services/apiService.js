import axios from 'axios';

const API_URL = 'http://localhost:8080';

const apiService = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const loginUser = async (user) => {
    const response = await apiService.post('/login', user);
    if (response && response.data && response.data.token) {
        apiService.defaults.headers['Authorization'] = 'Bearer ' + response.data.token;
    }
    return response;
};


export const VerifyManagerPageAccess = () => {
  return apiService.get('/managerpage', {
    headers: {
      'Authorization': `Bearer ${apiService.defaults.headers['Authorization']}`
    }
  });
};

export const logoutUser = () => {
  return apiService.get('/logout', {
    headers: {
      'Authorization': `Bearer ${apiService.defaults.headers['Authorization']}`
    }
  });
};
