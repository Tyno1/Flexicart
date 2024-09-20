import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ShopsContext } from "./ShopsContext";

export type RegisterType = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  imageUrl?: string;
};

export type LoginType = {
  email: string;
  password: string;
};
type AuthContextProps = {
  user: any;
  setUser: (user: any) => void;
  isLoading: boolean;
  error?: any;
  login: (payload: LoginType) => Promise<unknown>;
  logout: () => void;
  register: (payload: RegisterType) => Promise<unknown>;
};

export const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://192.168.100.9:3000";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const { shopData } = useContext(ShopsContext);

  const login = (payload: LoginType) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .post(`${apiUrl}/auth/${shopData?._id}/login`, payload)
        .then(async (response) => {
          setIsLoading(false);
          await AsyncStorage.setItem("user", JSON.stringify(response.data));
          setUser(response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error);
        });
    });
  };

  const register = async (payload: RegisterType) => {
    setIsLoading(true);
    try {
      // Ensure shopData is not null/undefined and has _id
      if (!shopData?._id) {
        throw new Error("Shop ID is not available");
      }

      const response = await axios.post(
        `${apiUrl}/auth/${shopData?._id}/signup`,
        payload
      );
      setIsLoading(false);

      return response;
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  // get user from async storage
  const getSavedUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        return parsedUser;
      }
      return null;
    } catch (error) {
      console.error("Failed to load saved user:", error);
      throw error;
    }
  };





  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await getSavedUser();
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, register, isLoading, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
