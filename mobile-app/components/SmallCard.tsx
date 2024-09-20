import { SIZES, COLORS } from "@/constants/themes";
import { FontAwesome } from "@expo/vector-icons";
import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

export type ItemProp = {
  imageUrls?: any;
  name: string;
  price: string;
};
type CardProp = {
  product: ItemProp;
  handleCardPress: (item: ItemProp) => void;
  appFonts: any;
};

export default function SmallCard({
  product,
  handleCardPress,
  appFonts,
}: CardProp) {

  const imageSource =
  product?.imageUrls.length >= 1
    ? { uri: product?.imageUrls[0]?.image }
    : require("@/assets/images/item_placeholder.png");

  return (
    <TouchableOpacity
      onPress={() => handleCardPress(product)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Image
        source={imageSource}
        style={styles.image}
      />
      <View style={styles.bottomSection}>
        <Text
          numberOfLines={2}
          style={{ ...styles.name, fontFamily: appFonts.bold }}
        >
          {product?.name}
        </Text>
        <Text style={{ ...styles.price, fontFamily: appFonts.regular }}>
          £{product?.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.xMassive,
    height: SIZES.xxMassive,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    marginBottom: SIZES.small,
    marginRight: SIZES.small,
  },
  image: {
    width: "100%",
    flex: 5,
    borderRadius: 4,
    resizeMode: "cover",
    backgroundColor: "white",
  },
  bottomSection: {
    width: "100%",
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-between",

    marginTop: SIZES.xSmall,
  },
  name: {
    fontSize: SIZES.small,
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
