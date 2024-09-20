import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

type FontType = {
  family: string;
  color: string;
};

type BannerType = {
  image?: string;
};

type AppDataPayload = {
  title: string;
  splashScreenColor: string;
  primaryColor: string;
  secondaryColor: string;
  font: FontType;
  banners?: BannerType[];
  productEnabled: boolean;
  serviceEnabled: boolean;
  createdBy: string;
  currentOwner: string;
  _id?: string;
};

type AppDataContextProps = {
  createAppData: (payload: AppDataPayload) => Promise<unknown>;
  editAppData: (payload: AppDataPayload) => Promise<unknown>;
  getAppDataByOwnerId?: (ownerId: string) => Promise<unknown>;
  deleteAppDataBannerImage: (
    appDataId: string | undefined,
    imageIndex: string
  ) => Promise<unknown>;
  getAppData: () => void;
  appDatas: any;
  loading: boolean;
  error: any;
  deleteAppData: (appDataId: string) => Promise<unknown>;
};

type AppDataProviderProps = {
  children: React.ReactNode;
};

export const AppDataContext = createContext({} as AppDataContextProps);

export const AppDataProvider = ({ children }: AppDataProviderProps) => {
  const [appDatas, setAppDatas] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const { user } = useContext(AuthContext);

  const getAppData = () => {
    if (user && user.user && user.user._id) {
      getAppDataByOwnerId(user.user._id);
    }
  };
  const createAppData = (payload: AppDataPayload) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/app-data`,
          payload,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getAppData();
          setLoading(false);
          resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };

  const editAppData = (payload: AppDataPayload) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .put(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/app-data/${
            payload._id
          }`,
          payload,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getAppData();
          setLoading(false);
          resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };

  const deleteAppDataBannerImage = (
    appDataId: string | undefined,
    bannerIndex: string
  ) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .delete(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL
          }/app-data/${appDataId}/image/${bannerIndex}`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getAppData();
          setLoading(false);
          resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };

  const getAppDataByOwnerId = (ownerId: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL
          }/app-data/user/${ownerId}`
        )
        .then((response) => {
          setLoading(false);
          setAppDatas(response.data);
          resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };

  const deleteAppData = (appDataId: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .delete(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL
          }/app-data/${appDataId}`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getAppData();
          setLoading(false);
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
    getAppData();
  }, [user]);

  return (
    <AppDataContext.Provider
      value={{
        appDatas,
        loading,
        error,
        getAppData,
        createAppData,
        editAppData,
        deleteAppDataBannerImage,
        deleteAppData,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
