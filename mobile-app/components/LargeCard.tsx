import { SIZES, COLORS } from "@/constants/themes";
import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import TextButton from "./Buttons/TextButton";
import { AppDataContext } from "@/context/AppDataContext";
import IconButton from "./Buttons/IconButton";

export type ItemProp = {
  _id?: string;
  imageUrls: any;
  name: string;
  price: string;
};
type CardProp = {
  item: ItemProp;
  handleCardPress: (item: ItemProp) => void;
  handleAddToCart: (item: any) => void;
  cart: any;
};

export default function LargeCard({
  item,
  handleCardPress,
  handleAddToCart,
  cart,
}: CardProp) {
  const { appColors, appFonts } = useContext(AppDataContext);
  const [itemInCart, setItemInCart] = useState(false);

  useEffect(() => {
    let isItemInCart = false;
    if (cart && cart.services && item) {
      isItemInCart = cart.services.some(
        (cartItem: any) => cartItem.serviceId._id === item._id
      );
    }
    if (cart && cart.products && item) {
      isItemInCart =
        isItemInCart ||
        cart.products.some(
          (cartItem: any) => cartItem.productId._id === item._id
        );
    }
    setItemInCart(isItemInCart);
  }, [cart, item]);

  const imageSource =
    item?.imageUrls.length >= 1
      ? { uri: item?.imageUrls[0]?.image }
      : require("@/assets/images/item_placeholder.png");

  return (
    <TouchableOpacity
      onPress={() => handleCardPress(item)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Image source={imageSource} style={styles.image} />
      <View style={styles.bottomSection}>
        <Text
          numberOfLines={2}
          style={{
            ...styles.name,
            color: appColors.primary,
            fontFamily: appFonts.bold,
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            ...styles.price,
            color: appColors.primary,
            fontFamily: appFonts.regular,
          }}
        >
          £{item.price}
        </Text>
        {!itemInCart ? (
          <IconButton
            icon={
              <Image
                style={{
                  tintColor: appColors.primary,
                  resizeMode: "contain",
                  width: SIZES.large,
                  height: SIZES.large,
                }}
                source={require("@/assets/icons/cart.png")}
              />
            }
            onPress={() => handleAddToCart(item)}
            ContainerStyling={{
              ...styles.cartContainer,
              backgroundColor: `${appColors.primary}09`,
            }}
          />
        ) : (
          <View
            style={{
              ...styles.cartContainer,
              backgroundColor: `${appColors.primary}09`,
            }}
          >
            <Text
              style={{
                fontSize: SIZES.small,
                color: appColors.primary,
                fontFamily: appFonts.regular,
              }}
            >
              In Cart
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "50%",
    height: SIZES.xxxMassive + SIZES.xxMassive,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    marginBottom: SIZES.small,
    position: "relative",
  },
  image: {
    width: "100%",
    flex: 6,
    borderRadius: SIZES.xSmall,
    resizeMode: "cover",
    backgroundColor: "white",
  },
  bottomSection: {
    width: "100%",
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.xSmall,
    paddingBottom: SIZES.small,
    marginTop: SIZES.xSmall,
  },
  name: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  price: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    marginTop: 5,
  },
  cartContainer: {
    position: "absolute",
    bottom: 0,
    right: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
