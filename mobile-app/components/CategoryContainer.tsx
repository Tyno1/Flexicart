import React, { useContext } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { CategoryContext } from "@/context/CategoryContext";
import { router } from "expo-router";

type CategoryProp = {
  image?: string;
  name: string;
};
type CategoryContainerProp = {
  category: CategoryProp;
  appFonts: any;
};
export default function CategoryContainer({
  category,
  appFonts,
}: CategoryContainerProp) {
  const { appColors } = useContext(AppDataContext);
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);

  const handleCardPress = (value: any) => {
    setSelectedCategory(value);
    if (value.type === "Product") {
      router.push("/products");
    } else {
      router.push("/services");
    }
  };

  const imageSource = category.image
    ? { uri: category.image }
    : require("@/assets/images/item_placeholder.png");

  return (
    <TouchableOpacity
      onPress={() => handleCardPress(category)}
      style={styles.container}
    >
      <Image style={styles.image} source={imageSource} />
      <Text
        numberOfLines={2}
        style={{
          ...styles.imageText,
          color: appColors.primary,
          fontFamily: appFonts?.regular,
        }}
      >
        {category?.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: SIZES.xxLarge,
    width: SIZES.xMassive,
  },
  image: {
    width: SIZES.xxLarge + SIZES.xLarge,
    height: SIZES.xxLarge + SIZES.xLarge,
    borderRadius: SIZES.xxLarge,
    resizeMode: "cover",
    marginBottom: SIZES.small,
  },
  imageText: {
    fontSize: SIZES.small,
    fontWeight: "bold",
    textAlign: "center",
  },
});
