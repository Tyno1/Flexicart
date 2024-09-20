import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { StoreContext } from "./StoreContext";

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
  deleteOrder: (id: string) => Promise<unknown>;
  getOrderById: (id: string) => Promise<unknown>;
  getOrdersByStoreId: () => void;
  orders: OrderType[];
  order: OrderType;
  loading: boolean;
  error: any;
};

type OrderProviderProps = {
  children: React.ReactNode;
};

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
  const { store } = useContext(StoreContext);

  const getOrdersByStoreId = () => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/orders/shop/${
          store?._id
        }`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const getOrderById = (id: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/orders/${id}`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          setLoading(false);
          resolve(response.data);
          setOrder(response.data);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };

  const deleteOrder = (id: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .delete(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/orders/${id}`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then((response) => {
          getOrdersByStoreId();
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
    if (user?.user?._id && store?._id) {
      getOrdersByStoreId();
    }
  }, [user, store]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        order,
        loading,
        error,
        deleteOrder,
        getOrderById,
        getOrdersByStoreId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
