import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID } from '@env';
import axios from 'axios';
import { Platform } from 'react-native';
import { StorageAdapter } from '../adapters/async-storage';

export const API_URL =
  STAGE === 'prod'
    ? PROD_URL
    : Platform.OS === 'ios'
    ? API_URL_IOS
    : API_URL_ANDROID;

const tesloApi = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptors - it's an axios middleware
// It's basically to read from the device's storage to retrieve our stored access token
// And to make sure to send it to the headers
tesloApi.interceptors.request.use(async config => {
  const token = await StorageAdapter.getItem('token');

  if (token) {
    // In case we have the token, attach it to the headers
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config; // In case we don't have the token, send the config without the token
});

export { tesloApi };
