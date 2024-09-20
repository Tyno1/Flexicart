import { Link, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Modal, Platform, StyleSheet, Text, View } from "react-native";
import Login from "../(auth)/login";
import { useContext } from "react";
import { AppDataContext } from "@/context/AppDataContext";
import Register from "../(auth)/register";

export default function RegisterModal() {
  const { appColors, appFonts } = useContext(AppDataContext);
  const isPresented = router.canGoBack();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Register",
          headerTitleStyle: {
            color: appColors.primary,
            fontFamily: appFonts.bold
          },
        }}
      />
      <View style={styles.container}>
        <View style={styles.separator} />
        {!isPresented && <Link href="/(main)">Dismiss</Link>}
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        <Register />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  separator: {
    height: 1,
    width: "80%",
  },
});
