import { SIZES } from "@/constants/themes";
import { FontAwesome } from "@expo/vector-icons";
import React, { Component, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import TrendingCard from "./TrendingCard";
import { ProductContext } from "@/context/ProductContext";
import IconButton from "./Buttons/IconButton";
import { AppDataContext } from "@/context/AppDataContext";
import { router } from "expo-router";

export default function Trending() {
  const { products, setSelectedProduct } = useContext(ProductContext);
  const { appColors, appFonts } = useContext(AppDataContext);

  const navigate = (link: any, id: string) => {
    router.push({ pathname: link, params: { id } });
  };

  const handleCardPress = (item: any) => {
    navigate("/products/[id]", item._id);
    setSelectedProduct(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text
          style={{
            ...styles.topSectionText,
            color: appColors.primary,
            fontFamily: appFonts.bold,
          }}
        >
          Trending Products and Services
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/products")}
          style={styles.viewButton}
        >
          <Text
            style={{
              ...styles.viewText,
              color: appColors.primary,
              fontFamily: appFonts.bold,
            }}
          >
            View All
          </Text>
          <IconButton
            icon={
              <Image
                style={{ tintColor: appColors.primary }}
                source={require("@/assets/icons/small_right_arrow.png")}
              />
            }
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        horizontal
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <TrendingCard
            handleCardPress={handleCardPress}
            product={item}
            appFonts={appFonts}
          />
        )}
        contentContainerStyle={styles.flatListContent}
        showsHorizontalScrollIndicator={false} // Hides the horizontal scroll indicator
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "30%",
    width: "100%",
    paddingHorizontal: SIZES.small,
  },
  topSectionText: {
    fontSize: SIZES.medium,
    flex: 5,
  },
  topSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewButton: {
    paddingVertical: SIZES.xSmall,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
  },
  viewText: {
    marginRight: SIZES.xSmall,
    fontSize: SIZES.medium,
  },
  flatListContent: {
    paddingHorizontal: SIZES.small,
    gap: SIZES.small,
  },
});
