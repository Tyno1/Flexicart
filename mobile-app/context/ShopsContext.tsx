import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

type ShopsContextProps = {
  loading: boolean;
  error?: any;
  setError: (err: any) => void;
  shops: any[];
  selectedShopUi: string;
  setSelectedShopUi: (shopUi: string) => void;
  selectedShop: any;
  setSelectedShop: (shop: any) => void;
  savedShopId: any;
  setSavedShopId: (shopId: any) => void;
  savedShopUi: any;
  setSavedShopUi: (shopId: any) => void;
  shopData: any;
  setShopData: (shop: any) => void;
};

export const ShopsContext = createContext({} as ShopsContextProps);

type ShopsProviderProps = {
  children: React.ReactNode;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://192.168.100.9:3000";

export const ShopsProvider = ({ children }: ShopsProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [shops, setShops] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [selectedShopUi, setSelectedShopUi] = useState<string>("");
  const [savedShopUi, setSavedShopUi] = useState<any>(null);
  const [selectedShop, setSelectedShop] = useState<any>(null);
  const [savedShopId, setSavedShopId] = useState<any>(null);
  const [shopData, setShopData] = useState<any>(null);

  const getShops = () => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiUrl}/shops`)
        .then((response) => {
          setLoading(false);
          setShops(response.data);
          setError(null);
          resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };

  //get shop from async storage
  const getSavedShop = async () => {
    try {
      const shop = await AsyncStorage.getItem("saved-shop") || undefined;
      if (shop !== undefined) {
        const parsedShop = JSON.parse(shop);
        setSavedShopId(parsedShop);
        return parsedShop;
      } else {
        console.log("No saved shop found");
        return null;
      }
    } catch (error) {
      console.log("Failed to load saved shop:", error);
      throw error;
    }
  };

  const getSingleShop = () => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .get(`${apiUrl}/shops/${savedShopId || selectedShop}`)
        .then((response) => {
          setLoading(false);
          setShopData(response.data);
          resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };


  //get shopUI from async storage
  const getSavedShopUi = async () => {
    try {
      const shopUi = await AsyncStorage.getItem("saved-shop-ui") || undefined;
      if (shopUi !== undefined) {
        const parsedShopUi = JSON.parse(shopUi);
        setSavedShopUi(parsedShopUi);
        return parsedShopUi;
      } else {
        console.log("No saved shop Ui found");
        return null;
      }
    } catch (error) {
      console.log("Failed to load saved shop Ui:", error);
      throw error;
    }
  };

  useEffect(() => {
    getShops();
  }, []);

  useEffect(() => {
    getSavedShop();
    getSavedShopUi();
  }, []);

  useEffect(() => {
    if (savedShopId || selectedShop) {
      getSingleShop();
    }
  }, [savedShopId, selectedShop]);

  return (
    <ShopsContext.Provider
      value={{
        loading,
        error,
        shops,
        selectedShopUi,
        setSelectedShopUi,
        selectedShop,
        setSelectedShop,
        savedShopId,
        setSavedShopId,
        shopData,
        setShopData,
        savedShopUi,
        setSavedShopUi,
        setError
      }}
    >
      {children}
    </ShopsContext.Provider>
  );
};
