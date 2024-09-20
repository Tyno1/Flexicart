import axios from "axios";
import React, { createContext, useState } from "react";

type AuthContextProps = {
  isLoggedIn: boolean;
  user: any;
  isLoading?: boolean;
  login: (payload: { email: string; password: string }) => Promise<unknown>;
  logout: () => void;
  register: (payload: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<unknown>;
  savedUser?: string | null;
  parsedUser?: any;
};

export const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const savedUser = localStorage.getItem("user");
  const parsedUser = savedUser ? JSON.parse(savedUser) : null;
  const [user, setUser] = useState<any>(parsedUser);

  const login = (payload: { email: string; password: string }) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      axios
        .post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL
          }/auth/admin-login`,
          payload
        )
        .then((response) => {
          setIsLoading(false);
          localStorage.setItem("user", JSON.stringify(response.data));
          setUser(response.data);
          setIsLoggedIn(true);
          resolve(response);
          window.location.replace("/dashboard");
        })
        .catch((error) => {
          setIsLoading(false);
          reject(error);
        });
    });
  };

  const register = (payload: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      axios
        .post(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL
          }/auth/admin-register`,
          payload
        )
        .then((response) => {          
          setIsLoading(false);
          setUser(response.data);
          window.location.replace("/email-confirmation");
          resolve(response);
        })
        .catch((error) => {
          setIsLoading(false);
          reject(error);
        });
    });
  };

  const logout = () => {
    localStorage.clear();
    window.location.replace("/login");
    setUser(null);
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{ login, logout, register, isLoggedIn, user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
