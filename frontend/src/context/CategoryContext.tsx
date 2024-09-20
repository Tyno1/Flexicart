import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { StoreContext } from "./StoreContext";

export enum CategoryTypeEnum {
  Product = "Product",
  Service = "Service",
}

type CategoryType = {
  name: string;
  description: string;
  shopId: string;
  type: CategoryTypeEnum;
  _id?: string;
};

type CategoryContextProps = {
  createCategory: (payload: CategoryType) => Promise<unknown>;
  editCategory: (payload: CategoryType) => Promise<unknown>;
  deleteCategory: (id: string) => Promise<unknown>;
  getCategoryById: (id: string) => Promise<unknown>;
  getCategoriesByStoreId: () => void;
  categories: CategoryType[];
  loading: boolean;
};

type CategoryProviderProps = {
  children: React.ReactNode;
};

export const CategoryContext = createContext({} as CategoryContextProps);

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(AuthContext);
  const { store } = useContext(StoreContext);

  const getCategoriesByStoreId = () => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/categories/store/${
          store?._id
        }`,

        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const createCategory = (payload: CategoryType) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/categories`,
          payload,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getCategoriesByStoreId();
          setLoading(false);
          resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          reject(error);
        });
    });
  };

  const editCategory = (payload: CategoryType) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .put(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/categories/${
            payload?._id
          }`,
          payload,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getCategoriesByStoreId();
          setLoading(false);
          resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          reject(error);
        });
    });
  };

  const deleteCategory = (id: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .delete(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL
          }/categories/${id}`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getCategoriesByStoreId();
          setLoading(false);
          resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          reject(error);
        });
    });
  };

  const getCategoryById = (id: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL
          }/categories/${id}`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          setLoading(false);
          resolve(response.data);
        })
        .catch((error) => {
          setLoading(false);
          reject(error);
        });
    });
  };

  useEffect(() => {
    if (user?.user?._id && store?._id) {
      getCategoriesByStoreId();
    }
  }, [user, store]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        createCategory,
        editCategory,
        deleteCategory,
        getCategoryById,
        getCategoriesByStoreId,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
