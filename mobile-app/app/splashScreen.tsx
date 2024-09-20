import { COLORS } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { CategoryContext } from "@/context/CategoryContext";
import { ProductContext } from "@/context/ProductContext";
import { ServiceContext } from "@/context/ServiceContext";
import { ShopsContext } from "@/context/ShopsContext";
import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

const SplashScreen = () => {
  const {
    appData,
    appColors,
    loading: appDataLoading,
    error: appDataError,
    setError: setAppDataError,
  } = useContext(AppDataContext);
  const {
    shopData,
    loading: shopLoading,
    error: shopError,
    setError: setShopError,
  } = useContext(ShopsContext);
  const {
    categories,
    isLoading: categoryLoading,
    error: categoryError,
    setError: setCategoryError,
  } = useContext(CategoryContext);
  const {
    products,
    isLoading: productLoading,
    error: productError,
    setError: setProductError,
  } = useContext(ProductContext);
  const {
    services,
    isLoading: serviceLoading,
    error: serviceError,
    setError: setServiceError,
  } = useContext(ServiceContext);

  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  useEffect(() => {
    setAppDataError(null);
    setCategoryError(null);
    setProductError(null);
    setServiceError(null);
    setShopError(null);

    const loadData = () => {
      if (
        appDataLoading ||
        shopLoading ||
        categoryLoading ||
        productLoading ||
        serviceLoading
      ) {
        setLoadingMessage("Data is currently downloading...");
      } else if (
        appDataError ||
        shopError ||
        categoryError ||
        productError ||
        serviceError
      ) {
        setLoadingMessage("Failed to load data. Please try again.");
      } else {
        setLoadingMessage("Getting things sorted for you...");

        setTimeout(() => {
          router.replace("/(main)");
        }, 3000); // Adding a small delay for the transition
      }
    };

    loadData();
  }, [
    appDataLoading,
    shopLoading,
    categoryLoading,
    productLoading,
    serviceLoading,
    appDataError,
    shopError,
    categoryError,
    productError,
    serviceError,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          ...styles.logoText,
          color: appData?.primaryColor || COLORS.black,
        }}
      >
        {shopData?.shopDetails?.name}
      </Text>
      <Text style={styles.loadingText}>{loadingMessage}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  loadingText: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
    position: "absolute",
    bottom: 70,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
});

export default SplashScreen;
