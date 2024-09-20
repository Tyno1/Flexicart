import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ShopsContext } from "./ShopsContext";

type CategoryContextProps = {
  isLoading: boolean;
  error?: any;
  setError: (error: any) => void;
  categories: any[];
  selectedCategory: any;
  setSelectedCategory: any;
};

export const CategoryContext = createContext({} as CategoryContextProps);

type CategoryProviderProps = {
  children: React.ReactNode;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { savedShopId, selectedShop } = useContext(ShopsContext);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getCategoriesByShopId = () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      console.log(savedShopId, selectedShop);

      axios
        .get(`${apiUrl}/categories/store/${savedShopId || selectedShop}`)
        .then((response) => {
          setIsLoading(false);
          setCategories(response.data);
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
    if (savedShopId || selectedShop) {
      getCategoriesByShopId();
    }
  }, [savedShopId || selectedShop]);

  return (
    <CategoryContext.Provider
      value={{
        isLoading,
        error,
        categories,
        selectedCategory,
        setSelectedCategory,
        setError,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
