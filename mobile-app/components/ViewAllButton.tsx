import { COLORS, SIZES } from "@/constants/themes";
import { router } from "expo-router";
import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ViewAllButton({
  appColors,
  appFonts,
  route,
  title,
}: any) {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/${route}`)}
      activeOpacity={0.7}
      style={{
        ...styles.buttonContainer,
        backgroundColor: `${appColors?.primary}10`,
      }}
    >
      <Text
        style={{
          ...styles.buttonText,
          color: appColors.primary,
          fontFamily: appFonts.bold,
        }}
      >
        View All {title}
      </Text>
      <View>
        <Image
          style={{ tintColor: appColors?.primary }}
          source={require("@/assets/icons/arrow.png")}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "95%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: SIZES.small,
    marginTop: SIZES.small,
    marginHorizontal: "auto",
  },
  buttonText: {
    fontSize: SIZES.medium,
  },
});
