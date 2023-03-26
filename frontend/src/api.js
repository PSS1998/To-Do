import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBTUyIsImlhdCI6MTY3OTc3NzI3NSwiZXhwIjoxNjc5NzgzMjc1fQ.dqqVQx92i3bo40MCpvhietDTngdRYTE-iMYzu4K7_zs';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

export const registerUser = async (username, password, name) => {
  const response = await apiClient.post('/user/post', {
    username,
    password,
    name,
  });
  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await apiClient.post('/auth/login', {
    username,
    password,
  });
  const { access_token } = response.data;
  localStorage.setItem('access_token', access_token);
  return response.data;
};

export const getAllTasks = async () => {
  const response = await apiClient.get('/todo/task');
  return Array.isArray(response.data) ? response.data : [];
};

export const postTask = async (taskData) => {
  const response = await apiClient.post('/todo/task/post', taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await apiClient.delete(`/todo/task/delete/${id}`);
  return response.data;
};
