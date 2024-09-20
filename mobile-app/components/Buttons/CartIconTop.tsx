import { COLORS } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { CartContext } from "@/context/CartContext";
import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CartIconTop() {
  const { appColors } = useContext(AppDataContext);
  const { cart } = useContext(CartContext);
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    if (cart && Array.isArray(cart.products) && Array.isArray(cart.services)) {
      const totalProducts = cart.products.reduce(
        (total, product) => total + (product.quantity || 1),
        0
      );
      const totalServices = cart.services.reduce(
        (total, service) => total + (service.quantity || 1),
        0
      );

      setTotalCart(totalProducts + totalServices);
    }
  }, [cart]);

  return (
    <TouchableOpacity
      onPress={() => router.push("/cart")}
      style={styles.container}
    >
      <Image
        testID="cart-icon"
        style={{ ...styles.cartIcon, tintColor: appColors.primary }}
        source={require("@/assets/icons/cart.png")}
      />
      {totalCart > 0 && (
        <View
          style={{
            ...styles.cartAmountContainer,
            backgroundColor: appColors.primary,
          }}
        >
          <Text style={styles.cartAmount}>{totalCart}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderRadius: 5,
    position: "relative",
  },
  cartIcon: {
    width: 24,
    height: 24,
  },
  cartAmountContainer: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cartAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
