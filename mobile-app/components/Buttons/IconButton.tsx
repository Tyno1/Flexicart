import React, { ReactNode } from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from "react-native";

type ButtonProps = {
  icon: string | ReactNode;
  onPress?: () => void;
  ContainerStyling?: ViewStyle;
  styling?: TextStyle;
  testID?: string
};
export default function IconButton({
  icon,
  onPress,
  ContainerStyling,
  testID
}: ButtonProps) {
  return (
    <TouchableOpacity
      testID={testID}
      style={[styles.container, ContainerStyling]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

});
