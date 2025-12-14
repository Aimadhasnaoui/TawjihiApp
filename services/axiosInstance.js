import axios from 'axios';
import Constants from "expo-constants";
import { GetUser } from "../app/Store/authStore";
// import { getUserFromCookies } from '../Component/utilis/getUserFromCookies';
const { apiBaseUrl } = Constants.expoConfig.extra;
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

// Attach token to outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    const user = GetUser();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;