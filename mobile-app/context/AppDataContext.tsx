import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ShopsContext } from "./ShopsContext";

type FontType = {
  family: string;
  color: string;
};

type BannerType = {
  image?: string;
};

type AppDataPayload = {
  title: string;
  splashScreenColor: string;
  primaryColor: string;
  secondaryColor: string;
  font: FontType;
  banners?: BannerType[];
  productEnabled: boolean;
  serviceEnabled: boolean;
  createdBy: string;
  currentOwner: string;
  _id?: string;
};

type AppDataContextProps = {
  getAppDataById?: (selectedAppDataId: string) => Promise<unknown>;
  appData: any;
  loading: boolean;
  error: any;
  setError: (error: any) => void;
  appColors: any;
  appFonts: any;
};

type AppDataProviderProps = {
  children: React.ReactNode;
};

export const AppDataContext = createContext({} as AppDataContextProps);

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const AppDataProvider = ({ children }: AppDataProviderProps) => {
  const [appData, setAppData] = useState<AppDataPayload>({
    title: "",
    splashScreenColor: "#023E8A",
    primaryColor: "#023E8A",
    secondaryColor: "#b91c1c",
    font: { family: "Arial", color: "#ffffff" },
    productEnabled: false,
    serviceEnabled: false,
    createdBy: "",
    currentOwner: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const { selectedShopUi, savedShopUi } = useContext<any>(ShopsContext);
  const [appColors, setAppColors] = useState({
    primary: "#023E8A",
    secondary: "#b91c1c",
    tertiary: "#FF7754",

    gray: "#83829A",
    gray2: "#C1C0C8",

    white: "#F3F4F8",
    lightWhite: "#FAFAFC",
    black: "#000000",
    lightBlack: "#0c0a09",
  });

  const [appFonts, setAppFonts] = useState({
    thin: "Montserrat" + "Thin",
    regular: "Montserrat" + "Regular",
    bold: "Montserrat" + "Bold",
  });

  const getAppDataById = (selectedShopUi: string) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .get(`${apiUrl}/app-data/${selectedShopUi || savedShopUi}`)
        .then((response) => {
          setLoading(false);
          setAppData(response.data);
          setAppColors({
            ...appColors,
            primary: response.data.primaryColor,
            secondary: response.data.secondaryColor,
          });
          setAppFonts({
            ...appFonts,
            thin: response.data.font.family + "Thin",
            regular: response.data.font.family + "Regular",
            bold: response.data.font.family + "Bold",
          });
          AsyncStorage.setItem("app-data", JSON.stringify(response.data));
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
    if (selectedShopUi || savedShopUi) {
      getAppDataById(selectedShopUi || savedShopUi);
    }
  }, [selectedShopUi, savedShopUi]);

  return (
    <AppDataContext.Provider
      value={{
        appData,
        loading,
        error,
        appColors,
        appFonts,
        setError
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
