import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { shouldRefreshToken, refreshAccessToken } from "./tokenUtils";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

// Add request interceptor to check token expiration before each request
instance.interceptors.request.use(
  async (config) => {
    const token = getCookie("userToken") as string | undefined;
    if (token && shouldRefreshToken(token)) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        config.headers.Authorization = `Bearer ${newToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== "undefined"
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      } catch (err) {
        console.error("Failed to refresh token", err);
        // Token refresh failed, redirect to login
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
