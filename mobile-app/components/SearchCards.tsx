import { COLORS, SIZES } from "@/constants/themes";
import React, { useContext } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { AppDataContext } from "@/context/AppDataContext";
import { router } from "expo-router";

type SearchResultProp = {
  item: any;
  handleCardPress: (item: any) => void;
};

export default function SearchResult({
  item,
  handleCardPress,
}: SearchResultProp) {
  const { appColors, appFonts } = useContext(AppDataContext);
  const imageSource =
    item?.imageUrls.length >= 1
      ? { uri: item?.imageUrls[0]?.image }
      : require("@/assets/images/item_placeholder.png");

  return (
    <TouchableOpacity
      onPress={() => handleCardPress(item)}
      style={{ ...styles.container, borderColor: `${appColors.primary}20` }}
    >
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={styles.topSection}>
          <View style={styles.nameSection}>
            <Text
              numberOfLines={1}
              style={{ ...styles.name, fontFamily: appFonts.bold }}
            >
              {item?.name}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                ...styles.description,
                color: appColors.gray,
                fontFamily: appFonts.regular,
              }}
            >
              {item?.description}
            </Text>
          </View>
          <Text style={{ ...styles.totalPrice, fontFamily: appFonts.bold }}>
            £{item?.price}
          </Text>
        </View>
        <View style={styles.bottomSection}>
          <View
            style={
              item?.category?.type === "Product"
                ? { borderColor: appColors.primary, ...styles.badgeContainer }
                : { borderColor: appColors.gray, ...styles.badgeContainer }
            }
          >
            <Text
              style={
                item?.category?.type === "Product"
                  ? {
                      color: appColors.primary,
                      fontFamily: appFonts.regular,
                      ...styles.badge,
                    }
                  : {
                      color: appColors.gray,
                      fontFamily: appFonts.regular,
                      ...styles.badge,
                    }
              }
            >
              {item?.category?.type || "unknown"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: SIZES.xMassive + SIZES.small,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.small,
    borderWidth: 1,
    flexDirection: "row",
    padding: 5,
    marginBottom: SIZES.xSmall,
  },
  text: {
    fontSize: 20,
  },
  image: {
    height: "100%",
    resizeMode: "cover",
    flex: 1.5,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.small,
  },
  textContainer: {
    height: "100%",
    flex: 5,
    justifyContent: "space-between",
    paddingHorizontal: SIZES.small,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  nameSection: {
    flex: 4,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: SIZES.medium,
  },
  totalPrice: {
    flex: 2,
    fontSize: SIZES.large,
    textAlign: "right",
  },
  description: {
    fontSize: SIZES.small,
  },
  badgeContainer: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  badge: {
    fontWeight: "bold",
    fontSize: SIZES.xSmall,
  },
});
