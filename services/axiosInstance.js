import axios from 'axios';
import Constants from "expo-constants";
import { getUserFromCookies } from '../Component/utilis/getUserFromCookies';
import { useAuthStore } from '../app/Store/authStore';
const { apiBaseUrl } = Constants.expoConfig.extra;
  const user =  useAuthStore.getState().userAccepted;
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

// Attach token to outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    const user = getUserFromCookies();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);