import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { StoreContext } from "./StoreContext";

type ServiceType = {
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  shop: string;
  metaData?: object;
  _id?: string;
};

type ServiceContextProps = {
  createService: (payload: ServiceType) => Promise<unknown>;
  editService: (payload: ServiceType) => Promise<unknown>;
  deleteService: (id: string) => Promise<unknown>;
  getServiceById: (id: string) => Promise<unknown>;
  getServicesByStoreId: () => void;
  services: ServiceType[];
  loading: boolean;
  error: any;
};

type ServiceProviderProps = {
  children: React.ReactNode;
};

export const ServiceContext = createContext({} as ServiceContextProps);

export const ServiceProvider = ({ children }: ServiceProviderProps) => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const { user } = useContext(AuthContext);
  const { store } = useContext(StoreContext);

  const getServicesByStoreId = () => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/services/store/${
          store?._id
        }`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const createService = (payload: ServiceType) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/services`,
          payload,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getServicesByStoreId();
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

  const editService = (payload: ServiceType) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .put(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/services/${
            payload._id
          }`,
          payload,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getServicesByStoreId();
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

  const deleteService = (id: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .delete(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/services/${id}`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getServicesByStoreId();
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

  const getServiceById = (id: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/services/${id}`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          setLoading(false);
          resolve(response.data);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    if (user?.user?._id && store?._id) {
      getServicesByStoreId();
    }
  }, [user, store]);

  return (
    <ServiceContext.Provider
      value={{
        services,
        loading,
        error,
        createService,
        editService,
        deleteService,
        getServiceById,
        getServicesByStoreId,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
