import { COLORS, SIZES } from "@/constants/themes";
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  backgroundColor?: string;
  color?: string;
  ContainerStyling?: ViewStyle;
  styling?: TextStyle;
};
export default function TextButton({
  title,
  onPress,
  backgroundColor,
  color,
  styling,
  ContainerStyling,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, ContainerStyling]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={[styles.text, styling]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.small,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});
