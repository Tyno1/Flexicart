import React, { Component, useContext, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import TextButton from "./Buttons/TextButton";
import { AppDataContext } from "@/context/AppDataContext";
import IconButton from "./Buttons/IconButton";
import { SIZES } from "@/constants/themes";

type AddToCartProps = {
  quantity: number;
  setQuantity: (value: number) => void;
  handleAddToCart: () => void;
  HandleIncreament: (item: any) => void;
  HandleDecreament: (item: any) => void;
  productInCart: boolean;
  cartItem: any;
};

export default function AddToCart({
  quantity,
  setQuantity,
  handleAddToCart,
  productInCart,
  HandleDecreament,
  HandleIncreament,
  cartItem,
}: AddToCartProps) {
  const { appColors, appFonts } = useContext(AppDataContext);

  const Increament = () => {
    if (quantity >= 0) {
      setQuantity(quantity + 1);
    }
  };

  const Decreament = () => {
    if (quantity !== 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      {!productInCart ? (
        <View style={styles.container}>
          <TextButton
            onPress={handleAddToCart}
            title="Add to Cart"
            ContainerStyling={{
              borderWidth: 2,
              borderColor: appColors.primary,
              flex: 3,
              marginRight: SIZES.xxLarge,
            }}
            styling={{ color: appColors.primary, fontFamily: appFonts.regular }}
          />
          <View
            style={{ ...styles.increament, borderColor: appColors.primary }}
          >
            <IconButton
              onPress={Decreament}
              icon={
                <Image
                  style={{ tintColor: appColors.primary }}
                  source={require("@/assets/icons/minus.png")}
                />
              }
              ContainerStyling={{
                width: SIZES.xxxLarge,
              }}
              styling={{ color: appColors.primary }}
            />
            <TextInput
              onChange={(number) => setQuantity(Number(number))}
              value={String(quantity)}
              keyboardType="numeric"
              style={{ ...styles.quantity, fontFamily: appFonts.bold }}
            />
            <IconButton
              onPress={Increament}
              icon={
                <Image
                  style={{ tintColor: appColors.primary }}
                  source={require("@/assets/icons/plus.png")}
                />
              }
              ContainerStyling={{ width: SIZES.xxxLarge }}
              styling={{ color: appColors.primary }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={{ ...styles.increament, borderColor: appColors.primary }}
          >
            <IconButton
              onPress={() => HandleDecreament(cartItem[0])}
              icon={
                <Image
                  style={{ tintColor: appColors.primary }}
                  source={require("@/assets/icons/minus.png")}
                />
              }
              ContainerStyling={{
                width: SIZES.xxxLarge,
              }}
              styling={{ color: appColors.primary }}
            />
            <TextInput
              value={String(cartItem[0].quantity)}
              keyboardType="numeric"
              style={{...styles.quantity, fontFamily: appFonts.bold}}
            />
            <IconButton
              onPress={() => HandleIncreament(cartItem[0])}
              icon={
                <Image
                  style={{ tintColor: appColors.primary }}
                  source={require("@/assets/icons/plus.png")}
                />
              }
              ContainerStyling={{ width: SIZES.xxxLarge }}
              styling={{ color: appColors.primary }}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  increament: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 4,
  },
  quantity: {
    paddingHorizontal: 20,
    alignItems: "center",
    borderColor: "gray",
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
});
