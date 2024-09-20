import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";



type FontContextProps = {
  fonts: any;
  loading: boolean;
  error: any;
  addFonts: () => Promise<unknown>;
  getFonts: () => Promise<unknown>;
};

type FontProviderProps = {
  children: React.ReactNode;
};

export const FontContext = createContext({} as FontContextProps);

export const FontProvider = ({ children }: FontProviderProps) => {
  const { user } = useContext(AuthContext);
  const [fonts, setFonts] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const addFonts = () => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/fonts`)
        .then((response) => {
          setLoading(false);
          getFonts();
          resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };

  const getFonts = () => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/fonts`)
        .then((response) => {
          setLoading(false);
          setFonts(response.data);
          resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    getFonts();
  }, [user]);

  return (
    <FontContext.Provider value={{ fonts, loading, error, getFonts, addFonts }}>
      {children}
    </FontContext.Provider>
  );
};
