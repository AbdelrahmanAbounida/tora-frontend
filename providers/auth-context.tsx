import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthResponse, DecodedToken } from "@/types/auth";
import { useRouter, usePathname } from "expo-router";

interface AuthContextProps {
  register: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  accessToken: string | null;
  refreshAccessToken: () => Promise<void>;
  isTokenExpired: (token: string) => boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const handleAxiosError = (axiosError: AxiosError) => {
  if (axios.isAxiosError(axiosError)) {
    console.error("Axios error:", axiosError);

    if (axiosError.response) {
      const errorMessage =
        (axiosError.response.data as { message?: string })?.message ||
        axiosError.response.statusText ||
        "An unknown error occurred";
      console.error("Error message:", errorMessage);
      return { error: errorMessage };
    }
  } else {
    console.error("Unexpected error:", axiosError);
    return { error: "An unexpected error occurred" + axiosError };
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const router = useRouter();
  const currentPath = usePathname();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${process.env.EXPO_PUBLIC_BASE_BACKEND_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      const { accessToken, refreshToken } = response.data;
      console.log({ accessToken, refreshToken });

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      return { accessToken, refreshToken };
    } catch (error) {
      const res = handleAxiosError(error as AxiosError);
      return res;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        // <AuthResponse>
        `${process.env.EXPO_PUBLIC_BASE_BACKEND_URL}/api/auth/register`,
        {
          email,
          password,
        }
      );
      const { accessToken, refreshToken } = response.data;
      console.log({ accessToken, refreshToken });

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);

      if (accessToken && refreshToken) {
        router.replace("/home");
      }
      return { accessToken, refreshToken };
    } catch (error) {
      console.error(error);
      const res = handleAxiosError(error as AxiosError);
      return res;
    }
  };

  const logout = async () => {
    setAccessToken(null);
    setRefreshToken(null);
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
  };

  const isLoggedIn = async () => {
    // update access token , refresh token , handle routing
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (accessToken && refreshToken) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        if (isTokenExpired(accessToken)) {
          refreshAccessToken();
        }

        if (currentPath.includes("auth")) {
          router.replace("/home");
        }
      }

      if ((!accessToken || !refreshToken) && !currentPath.includes("auth")) {
        router.replace("(auth)/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post<AuthResponse>(
        `${process.env.EXPO_PUBLIC_BASE_BACKEND_URL}/refresh`,
        {
          refreshToken,
        }
      );
      const { accessToken: newAccessToken } = response.data;
      setAccessToken(newAccessToken);
      await AsyncStorage.setItem("accessToken", newAccessToken);
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
    }
  };

  const isTokenExpired = (token: string): boolean => {
    const decoded = jwtDecode(token);

    if (!decoded) return true;
    return decoded.exp! * 1000 < Date.now();
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        accessToken,
        refreshAccessToken,
        isTokenExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
