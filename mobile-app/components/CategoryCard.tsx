import { SIZES, COLORS } from "@/constants/themes";
import { FontAwesome } from "@expo/vector-icons";
import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

export type ItemProp = {
  imageUrl: string;
  name: string;
  description: string;
};
type CardProp = {
  item: ItemProp;
  handleCardPress: (item: ItemProp) => void;
  appFonts: any;
};

export default function CategoryCard({
  item,
  handleCardPress,
  appFonts,
}: CardProp) {

  return (
    <TouchableOpacity
      onPress={() => handleCardPress(item)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Image
        source={
          item.imageUrl
            ? {
                uri: item?.imageUrl,
              }
            : require("@/assets/images/item_placeholder.png")
        }
        style={styles.image}
      />
      <View style={styles.bottomSection}>
        <Text style={{ ...styles.name, fontFamily: appFonts.bold }}>
          {item?.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{ ...styles.description, fontFamily: appFonts.regular }}
        >
          {item?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "50%",
    height: SIZES.xxxMassive + SIZES.xMassive,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    marginBottom: SIZES.small,
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
    paddingHorizontal: SIZES.xSmall,
    paddingBottom: SIZES.xSmall,
    marginTop: SIZES.xSmall,
  },
  name: {
    fontSize: SIZES.medium,
  },
  description: {
    fontSize: SIZES.small,
    marginTop: 5,
    color: COLORS.gray,
  },
});
