import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
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
  userData: any;
  setUserData: any;
  loading: boolean;
  error: any;
  updateUserData: (payload: UserProps) => Promise<unknown>;
};

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const getUserData = () => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/users/profile`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          setLoading(false);
          setUserData(response.data.data);
          resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };

  const updateUserData = (payload: UserProps) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/users/profile`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        .then((response) => {
          setLoading(false);
          getUserData();
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setLoading(false);
          setError(error);
        });
    });
  };

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        loading,
        error,
        updateUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
