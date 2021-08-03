import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.chucknorris.io/',
  headers: { Pragma: 'no-cache' },
});

export default axiosInstance;
