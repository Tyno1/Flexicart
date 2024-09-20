import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ShopsContext } from "./ShopsContext";

type OrderItemsType = {
  _id: string;
  quantity: number;
  price: any;
};

enum OrderStatus {
  Pending = "Pending",
  Completed = "Complete",
  Cancelled = "Cancelled",
}

export type OrderType = {
  _id: string;
  shopId: string;
  userId: string;
  paymentIntentId: string;
  status: OrderStatus;
  subtotal: number;
  total: number;
  items: OrderItemsType[];
  orderDate: Date;
};

type OrderContextProps = {
  getOrderByUserId: (userId: string) => Promise<unknown>;
  orders: any[];
  loading: boolean;
  error: any;
};

type OrderProviderProps = {
  children: React.ReactNode;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [order, setOrder] = useState<OrderType>({
    _id: "",
    shopId: "",
    userId: "",
    paymentIntentId: "",
    status: OrderStatus.Pending,
    subtotal: 0,
    total: 0,
    items: [],
    orderDate: new Date(),
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const { user } = useContext(AuthContext);
  const { shopData } = useContext(ShopsContext);

  const getOrderByUserId = (userId: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .get(`${apiUrl}/orders/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "x-shop-id": shopData?._id,
          },
        })
        .then((response) => {
          setLoading(false);
          resolve(response.data);
          setOrders(response.data);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };
  useEffect(() => {
    if (user) {
      getOrderByUserId(user.user._id);
    }
  }, [user]);
  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        getOrderByUserId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
