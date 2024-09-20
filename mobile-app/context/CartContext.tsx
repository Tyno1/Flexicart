import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ShopsContext } from "./ShopsContext";

type ProductProp = {
  _id?: string;
  productId: any;
  quantity: number;
};
type ServiceProp = {
  _id?: string;
  serviceId: any;
  quantity: number;
};

export type CartPayloadProp = {
  _id?: string;
  userId: string;
  products?: ProductProp[];
  services?: ServiceProp[];
  shop: string;
};
export type UpdateProp = {
  product?: ProductProp;
  service?: ServiceProp;
};

type CartContextProps = {
  isLoading: boolean;
  error?: any;
  cart: CartPayloadProp;
  setCart: (cart: CartPayloadProp) => void;
  createCart: (payload: CartPayloadProp) => Promise<any>;
  checkout: (payload: any) => Promise<any>;
  updateCart: (payload: UpdateProp, cartId: string) => Promise<any>;
  deleteCartItem: (payload: UpdateProp, cartId: string) => Promise<any>;
};

export const CartContext = createContext({} as CartContextProps);

type CartProviderProps = {
  children: React.ReactNode;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const CartProvider = ({ children }: CartProviderProps) => {
  const defaultCart = {
    userId: "",
    products: [],
    services: [],
    shop: "",
    cartId: "",
  };
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<CartPayloadProp>(defaultCart);
  const [error, setError] = useState(null);
  const [cartResponse, setCartResponse] = useState<any>();
  const { shopData } = useContext(ShopsContext);
  const { user } = useContext(AuthContext);

  const createCart = (payload: CartPayloadProp) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .post(`${apiUrl}/cart`, payload)
        .then((response) => {
          setIsLoading(false);
          getCartByUserId();
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error);
        });
    });
  };

  const getCartByUserId = () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiUrl}/cart/user/${user?.user?._id}`, {
          headers: {
            "x-shop-id": shopData?._id,
          },
        })
        .then((response) => {
          setIsLoading(false);
          setCart(response.data.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error);
          console.log("id", error);
        });
    });
  };

  const updateCart = (payload: UpdateProp, cartId: string) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .put(`${apiUrl}/cart/${cartId}`, payload, {
          headers: {
            "x-shop-id": shopData?._id,
          },
        })
        .then((response) => {
          setIsLoading(false);
          getCartByUserId();
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error);
          console.log("id", error);
        });
    });
  };

  const deleteCartItem = (payload: UpdateProp, cartId: string) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .put(`${apiUrl}/cart/${cartId}/remove`, payload, {
          headers: {
            "x-shop-id": shopData?._id,
          },
        })
        .then((response) => {
          setIsLoading(false);
          getCartByUserId();
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error);
          console.log("id", error);
        });
    });
  };

  const checkout = (payload: any) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .post(`${apiUrl}/intents`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setCart(defaultCart);
          setIsLoading(false);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error);
          console.log(error.message);
        });
    });
  };

  useEffect(() => {
    if (user?.user?._id && shopData?._id) getCartByUserId();
  }, [user, shopData]);

  useEffect(() => {
    getCartByUserId;
  }, []);
  return (
    <CartContext.Provider
      value={{
        isLoading,
        error,
        cart,
        createCart,
        updateCart,
        setCart,
        checkout,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
