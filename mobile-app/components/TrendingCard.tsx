import { SIZES, COLORS } from "@/constants/themes";
import { FontAwesome } from "@expo/vector-icons";
import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

export type ProductProp = {
  imageUrls: any;
  name: string;
  price: string;
};
type TrendingCardProp = {
  product: ProductProp;
  handleCardPress: (product: any) => void;
  appFonts: any;
};

export default function TrendingCard({
  product,
  handleCardPress,
  appFonts,
}: TrendingCardProp) {
  const imageSource =
    product?.imageUrls.length >= 1
      ? { uri: product?.imageUrls[0]?.image }
      : require("@/assets/images/item_placeholder.png");

  return (
    <TouchableOpacity
      onPress={() => handleCardPress(product)}
      style={styles.container}
    >
      <Image source={imageSource} style={styles.image} />
      <View style={styles.bottomSection}>
        <Text style={{ ...styles.name, fontFamily: appFonts.regular }}>
          {product?.name}
        </Text>
        <View style={styles.cartSection}>
          <Text style={{ ...styles.price, fontFamily: appFonts.regular }}>
            £{product?.price}
          </Text>
          <FontAwesome name="cart-plus" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZES.xxxMassive,
    height: SIZES.xxxMassive + SIZES.xxxLarge,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: SIZES.small,
    padding: 2,
  },
  image: {
    width: "100%",
    flex: 5,
    borderRadius: SIZES.small,
    resizeMode: "cover",
    backgroundColor: "white",
  },
  bottomSection: {
    width: "100%",
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.xSmall,
    paddingBottom: SIZES.xSmall,
    marginTop: SIZES.xSmall,
  },
  name: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  price: {
    fontSize: SIZES.small,
    marginTop: 5,
  },
  cartSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
