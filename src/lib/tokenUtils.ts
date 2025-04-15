import { getCookie, setCookie } from "cookies-next";
import axios from "axios";

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp <= currentTime;
};

export const shouldRefreshToken = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  // Refresh token if it expires in less than 5 minutes
  return decoded.exp - currentTime < 300;
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) return null;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/oauth/token`,
      {
        grantType: "refresh_token",
        refreshToken: refreshToken,
        clientId: "78deef1d-1370-49a1-8a46-7e131bbbee1a",
        clientSecret:
          "8d4a5621cc804f7979cf70d3e56195e54eccd224f6d98116733f2898d62f49c5",
      }
    );

    if (response.status === 201) {
      const newAccessToken = response.data.result.access_token;
      setCookie("userToken", newAccessToken);
      return newAccessToken;
    }
    return null;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
}; 