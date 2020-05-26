import axios from 'axios';

declare const localStorage: any;

const setAuthToken = (token: string|null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
