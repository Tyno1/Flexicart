import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ShopsContext } from "./ShopsContext";

type ProductContextProps = {
  isLoading: boolean;
  error?: any;
  setError(error: any): void;
  products: any[];
  setProducts: (products: any) => void;
  selectedProduct: any;
  setSelectedProduct: any;
  getProductsByCategoryId: (categoryId: string) => Promise<unknown>;
  searchResult: any;
  setSearchResult: any;
  searchProductsByName: (name: string) => Promise<unknown>;
  setAllProducts: (allProducts: boolean) => void;
  allProducts: boolean;
  productAverageRating: number;
  getProductAverageRating: (productId: string) => Promise<unknown>;
};

export const ProductContext = createContext({} as ProductContextProps);

type ProductProviderProps = {
  children: React.ReactNode;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const { savedShopId, selectedShop, shopData } = useContext(ShopsContext);
  const [searchResult, setSearchResult] = useState([]);
  const [allProducts, setAllProducts] = useState(false);
  const [productAverageRating, setProductAverageRating] = useState(0);

  const getProductsByShopId = () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiUrl}/products/store/${savedShopId || selectedShop}`)
        .then((response) => {
          setIsLoading(false);
          setProducts(response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error.messsage);
        });
    });
  };

  const getProductsByCategoryId = (categoryId: any) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiUrl}/products/category/${categoryId}`)
        .then((response) => {
          setIsLoading(false);
          setProducts(response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error.messsage);
        });
    });
  };

  const getProductAverageRating = (productId: string) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiUrl}/products/average-rating/${productId}`)
        .then((response) => {
          resolve(response.data);
          setProductAverageRating(response.data.rating);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const searchProductsByName = async (name: string) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiUrl}/products/search?name=${name}`, {
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
      getProductsByShopId();
    }
  }, [savedShopId, selectedShop]);

  useEffect(() => {
    if (allProducts) {
      getProductsByShopId();
    }
  }, [allProducts]);
  return (
    <ProductContext.Provider
      value={{
        isLoading,
        error,
        products,
        setProducts,
        selectedProduct,
        setSelectedProduct,
        getProductsByCategoryId,
        searchProductsByName,
        searchResult,
        setSearchResult,
        allProducts,
        setAllProducts,
        productAverageRating,
        getProductAverageRating,
        setError
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
