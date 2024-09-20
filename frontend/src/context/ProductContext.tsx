import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { StoreContext } from "./StoreContext";

type ProductType = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  shop: string;
  metaData?: object;
  _id?: string;
};

type ProductContextProps = {
  createProduct: (payload: ProductType) => Promise<unknown>;
  editProduct: (payload: ProductType) => Promise<unknown>;
  deleteProduct: (id: string) => Promise<unknown>;
  getProductById: (id: string) => Promise<unknown>;
  getProductsByStoreId: () => void;
  products: ProductType[];
  loading: boolean;
  error: any;
};

type ProductProviderProps = {
  children: React.ReactNode;
};

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const { user } = useContext(AuthContext);
  const { store } = useContext(StoreContext);

  const getProductsByStoreId = () => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/products/store/${
          store?._id
        }`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
        
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const createProduct = (payload: ProductType) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/products`,
          payload,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getProductsByStoreId();
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

  const editProduct = (payload: ProductType) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .put(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/products/${
            payload._id
          }`,
          payload,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getProductsByStoreId();
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

  const deleteProduct = (id: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .delete(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/products/${id}`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getProductsByStoreId();
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

  const getProductById = (id: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/products/${id}`,
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
    if ( user?.user && user?.user?._id && store?._id) {
      getProductsByStoreId();
    }
  }, [user, store]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        createProduct,
        editProduct,
        deleteProduct,
        getProductById,
        getProductsByStoreId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
