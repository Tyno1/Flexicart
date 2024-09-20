import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

type StorePayload = {
  name?: string;
  logo?: string | ArrayBuffer | null;
  storeType?: string;
  storeDescription?: string;
  address?: string;
  owner?: any;
};

type StoreContextProps = {
  createStore: (payload: StorePayload) => Promise<unknown>;
  getStoreByUserId: (ownerId: string) => Promise<unknown>;
  updateStoreById: (payload: StorePayload) => Promise<unknown>;
  updateStoreWithShop: (payload: any) => Promise<unknown>;
  store: any;
  loading: boolean;
  error: any;
};

type StoreProviderProps = {
  children: React.ReactNode;
};
export const StoreContext = createContext({} as StoreContextProps);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store, setStore] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const { user } = useContext(AuthContext);

  const getStore = () => {
    if (user && user.user && user.user._id) {
      getStoreByUserId(user.user._id);
    }
  };

  const getStoreByUserId = (ownerId: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL
          }/shops/owner/${ownerId}`
        )
        .then((response) => {
          setLoading(false);
          setStore(response.data);
          resolve(response.data);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };

  const createStore = (payload: StorePayload) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/shops`,
          payload
        )
        .then((response) => {
          resolve(response);
          getStore();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const updateStoreById = (payload: StorePayload) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/shops/${
            store._id
          }/details`,
          payload
        )
        .then((response) => {
          setLoading(false);
          resolve(response);
          getStore();
        })
        .catch((error) => {
          reject(error);
          setLoading(false);
        });
    });
  };

  const updateStoreWithShop = (payload: { shopUI: string }) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/shops/${
            store._id
          }/ui`,
          payload
        )
        .then((response) => {
          resolve(response);
          getStore();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    getStore();
  }, [user]);

  return (
    <StoreContext.Provider
      value={{
        createStore,
        getStoreByUserId,
        updateStoreById,
        updateStoreWithShop,
        store,
        loading,
        error,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
