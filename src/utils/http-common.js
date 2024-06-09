import axios from 'axios';

import { apiServer } from './servers';

export const http =  axios.create({
  baseURL: apiServer,
  headers: {
    authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
    'access-control-allow-origin': '*',
    'Content-Type': 'application/json',
  }
});


export const convertToQuery = (params) =>
  Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(
        params[key] ?? ''
      )}`)
    .join('&');