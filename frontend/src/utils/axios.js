import axios from 'axios';

import { KeysLocalStorage } from '../consts/consts';

const updatedAxios = axios.create({
  baseURL: 'http://localhost:4000',
});

updatedAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    KeysLocalStorage.TOKEN,
  )}`;

  return config;
});

export default updatedAxios;
