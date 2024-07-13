import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { AuthContext } from "@/providers/auth-context";

const ApiManager = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_BACKEND_URL,
});

ApiManager.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiManager.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const authContext = useContext(AuthContext);
      if (authContext) {
        const { refreshAccessToken, isTokenExpired } = authContext;
        if (refreshToken && !isTokenExpired(refreshToken)) {
          await refreshAccessToken();
          const accessToken = await AsyncStorage.getItem("accessToken");
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default ApiManager;
