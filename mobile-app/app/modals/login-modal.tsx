import { Link, Stack, router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Modal, Platform, StyleSheet, Text, View } from "react-native";
import Login from "../(auth)/login";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppDataContext } from "@/context/AppDataContext";
import { AuthContext } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "@/components/Buttons/IconButton";

export default function LoginModal() {
  const { appColors, appFonts } = useContext(AppDataContext);
  const isPresented = router.canGoBack();
  const [user, setUser] = useState();

  const getSavedUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        router.push("/(main)/(my_account)/edit_profile");
        return parsedUser;
      }
      return null;
    } catch (error) {
      console.error("Failed to load saved user:", error);
      throw error;
    }
  };

  useEffect(() => {
    getSavedUser();
  }, []);

  if (user) {
    router.push("/(main)");
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Login",
          headerTitleStyle: {
            color: appColors.primary,
            fontFamily: appFonts.bold,
          },
          headerLeft: () => (
            <View>
              <IconButton
                onPress={() => router.navigate("/(main)")}
                icon={
                  <Image
                    style={{ tintColor: appColors.primary }}
                    source={require("@/assets/icons/left_chevron.png")}
                  />
                }
                ContainerStyling={{
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}
              />
            </View>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.separator} />
        {/* {!isPresented && <Link href="/(main)">Dismiss</Link>} */}
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        <Login />
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
