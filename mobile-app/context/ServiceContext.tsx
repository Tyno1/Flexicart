import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ShopsContext } from "./ShopsContext";

type ServiceContextProps = {
  isLoading: boolean;
  error?: any;
  setError: (error: any) => void;
  services: any[];
  setServices: (service: any) => void;
  selectedService: any;
  setSelectedService: any;
  getServicesByCategoryId: (categoryId: string) => Promise<unknown>;
  searchResult: any;
  setSearchResult: any;
  searchServicesByName: (name: string) => Promise<unknown>;
  setAllServices: (allServices: boolean) => void;
  serviceAverageRating: number;
  getServiceAverageRating: (serviceId: string) => Promise<unknown>;
};

export const ServiceContext = createContext({} as ServiceContextProps);

type ServiceProviderProps = {
  children: React.ReactNode;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const ServiceProvider = ({ children }: ServiceProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [services, setServices] = useState<any[]>([]);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState<string>("");
  const { savedShopId, selectedShop, shopData } = useContext(ShopsContext);
  const [searchResult, setSearchResult] = useState([]);
  const [allServices, setAllServices] = useState(false);
  const [serviceAverageRating, setServiceAverageRating] = useState(0);


  const getServicesByShopId = () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiUrl}/services/store/${savedShopId || selectedShop}`)
        .then((response) => {
          setIsLoading(false);
          setServices(response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error);
        });
    });
  };

  const getServicesByCategoryId = (categoryId: any) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiUrl}/services/category/${categoryId}`)
        .then((response) => {
          setIsLoading(false);
          setServices(response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error);
        });
    });
  };

  const getServiceAverageRating = (serviceId: string) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiUrl}/services/average-rating/${serviceId}`)
        .then((response) => {
          resolve(response.data);
          setServiceAverageRating(response.data.rating);
          
        })
        .catch((error) => {
          reject(error);
        });
    });
  };


  const searchServicesByName = async (name: string) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiUrl}/services/search?name=${name}`, {
          headers: {
            "x-shop-id": shopData?._id,
          },
        })
        .then((response) => {
          setIsLoading(false);
          setSearchResult(response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error.messsage);
        });
    });
  };

  useEffect(() => {
    if (savedShopId || selectedShop) {
      getServicesByShopId();
    }
  }, [savedShopId || selectedShop]);

  useEffect(() => {
    if (allServices) {
      getServicesByShopId();
    }
  }, [allServices]);

  return (
    <ServiceContext.Provider
      value={{
        isLoading,
        error,
        services,
        selectedService,
        setSelectedService,
        getServicesByCategoryId,
        setServices,
        searchResult,
        setSearchResult,
        searchServicesByName,
        setAllServices,
        serviceAverageRating,
        getServiceAverageRating,
        setError
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
