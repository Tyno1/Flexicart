import { ShopsContext } from "@/context/ShopsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { router, Stack } from "expo-router";
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StoreSelect() {
  const {
    shops,
    selectedShopUi,
    setSelectedShopUi,
    setSelectedShop,
    savedShopId,
  } = useContext(ShopsContext);

  const handleShopSelect = async (shopUi: string) => {
    if (!shops || shops.length === 0) return; // Ensure shops is not empty or undefined
    const shop = shops.find((s) => s.shopUI === shopUi);
    const shopId = shop?._id;

    setSelectedShopUi(shopUi);
    setSelectedShop(shopId);

    try {
      await AsyncStorage.setItem("saved-shop-ui", JSON.stringify(shopUi));
      await AsyncStorage.setItem("saved-shop", JSON.stringify(shopId));
    } catch (error) {
      console.error("Error saving shop to AsyncStorage:", error);
    }

    router.replace("/splashScreen");
  };

  useEffect(() => {
    if (savedShopId) {
      router.replace("/(main)/(tabs)");
    }
  }, [savedShopId]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.pickerTitle}>Select a Shop:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            testID="shop-picker"
            selectedValue={selectedShopUi}
            onValueChange={(itemValue: string) => handleShopSelect(itemValue)}
          >
            {shops &&
              shops.length > 0 && // Ensure shops is populated before mapping
              shops.map((shop) => (
                <Picker.Item
                  key={shop._id}
                  testID={shop.shopDetails.name}
                  label={shop.shopDetails.name}
                  value={shop.shopUI}
                />
              ))}
          </Picker>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    width: "100%",
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
