import { COLORS, SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { Link } from "expo-router";
import React, { Component, ReactNode, useContext } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import IconButton from "./Buttons/IconButton";

export type ProfileProps = {
  icon: ReactNode;
  text: string;
  onPress?: () => void;
  asChild?: boolean;

};
export default function ProfileButtons({ icon, text, onPress, asChild }: ProfileProps) {
  const { appColors, appFonts } = useContext(AppDataContext);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={{
          ...styles.imageContainer,
        }}
      >
        {icon}
      </View>
      <Text
        style={{
          ...styles.text,
          color: appColors.primary,
          fontFamily: appFonts.regular,
        }}
      >
        {text}
      </Text>
      <IconButton
        ContainerStyling={{ marginLeft: "auto", paddingVertical: 0 }}
        icon={
          <Image
            style={{ tintColor: appColors.primary }}
            source={require("@/assets/icons/right_chevron.png")}
          />
        }
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.small,
    borderBottomWidth: 1,
    borderColor: COLORS.gray + 13,
  },
  imageContainer: {
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginLeft: 10,
  },
});
