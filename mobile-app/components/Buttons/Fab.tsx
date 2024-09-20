import React, { FC } from "react";
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";

interface FABProps {
  title: string;
  icon?: React.ReactNode;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

const FAB: FC<FABProps> = ({ testID, title, icon, onPress, containerStyle, textStyle }) => {
  return (
    <Pressable testID={testID} style={{ ...styles.container, ...containerStyle }}
      onPress={onPress}>
      <Text style={{ ...styles.title, ...textStyle }}>{title}</Text>
    </Pressable>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 40,
    right: 60,
    backgroundColor: "#225599",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
