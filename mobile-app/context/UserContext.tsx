import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export type UserProps = {
  _id?: string;
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string | null;
};

type UserContextProps = {
  isLoading: boolean;
  error?: any;
  userDetails: UserProps | undefined;
  updateUserById: (payload: UserProps) => Promise<unknown>;
};

export const UserContext = createContext({} as UserContextProps);

type UserProviderProps = {
  children: React.ReactNode;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const UserProvider = ({ children }: UserProviderProps) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<UserProps>();
  const [error, setError] = useState(null);

  const token = user?.token;

  const getUserById = () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiUrl}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIsLoading(false);
          setUserDetails(response.data.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error);
        });
    });
  };

  const updateUserById = (payload: UserProps) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .put(`${apiUrl}/users/profile`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIsLoading(false);
          setUserDetails(response.data.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error);
        });
    });
  };

  useEffect(() => {
    if (user) {
      getUserById();
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        error,
        userDetails,
        updateUserById,
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
