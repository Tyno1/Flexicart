import { AppDataContext } from "@/context/AppDataContext";
import { CartContext } from "@/context/CartContext";
import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function CartButton({ color }: any) {
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
    <View style={[styles.ContainerStyling]}>
      <View
        testID="cart-icon"
        style={{
          ...styles.cartAmountContainer,
          backgroundColor: color,
        }}
      >
        <Text
          style={{
            ...styles.cartAmount,
            color: "white",
          }}
        >
          {totalCart}
        </Text>
      </View>

      <Image
        style={{ tintColor: color }}
        source={require("@/assets/icons/cart.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerStyling: {
    paddingHorizontal: 10,
    borderRadius: 5,
    position: "relative",
    flexDirection: "row",
  },
  cartAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cartAmountContainer: {
    position: "absolute",
    bottom: -9,
    right: -9,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
