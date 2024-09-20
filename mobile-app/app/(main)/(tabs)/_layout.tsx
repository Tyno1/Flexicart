import React, { useContext } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppDataContext } from "@/context/AppDataContext";
import IconButton from "@/components/Buttons/IconButton";
import { SIZES } from "@/constants/themes";
import CartButton from "@/components/Buttons/CartButton";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
  const { appColors, appFonts } = useContext(AppDataContext);
  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: true,
        headerTitle: "",
        headerStatusBarHeight: 60,
        tabBarActiveTintColor: appColors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabelStyle: { fontFamily: appFonts.regular },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/icons/home.png")}
              style={{ tintColor: color }}
            />
          ),
          headerRight: () => (
            <View style={styles.iconContainer}>
              <IconButton
                onPress={() => router.push("/(main)/search")}
                icon={
                  <Image
                    style={{ tintColor: appColors.primary }}
                    source={require("@/assets/icons/search.png")}
                  />
                }
                ContainerStyling={{
                  backgroundColor: `${appColors.primary}10`,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Category",
          tabBarLabelStyle: { fontFamily: appFonts.regular },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/icons/category_icon.png")}
              style={{ tintColor: color }}
            />
          ),
          headerRight: () => (
            <View style={styles.iconContainer}>
              <IconButton
                onPress={() => router.push("/(main)/search")}
                icon={
                  <Image
                    style={{ tintColor: appColors.primary }}
                    source={require("@/assets/icons/search.png")}
                  />
                }
                ContainerStyling={{
                  backgroundColor: `${appColors.primary}10`,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}
              />
            </View>
          ),
          headerLeft: () => (
            <View>
              <IconButton
                onPress={() => router.back()}
                icon={
                  <Image
                    style={{ tintColor: appColors.primary }}
                    source={require("@/assets/icons/left_chevron.png")}
                  />
                }
                ContainerStyling={{
                  paddingHorizontal: 10,
                  marginBottom: 10,
                  marginLeft: 14,
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarLabelStyle: { fontFamily: appFonts.regular },
          tabBarIcon: ({ color }) => <CartButton color={color} />,
          headerRight: () => (
            <View style={styles.iconContainer}>
              <IconButton
                onPress={() => router.push("/(main)/search")}
                icon={
                  <Image
                    style={{ tintColor: appColors.primary }}
                    source={require("@/assets/icons/search.png")}
                  />
                }
                ContainerStyling={{
                  backgroundColor: `${appColors.primary}10`,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}
              />
            </View>
          ),
          headerLeft: () => (
            <View>
              <IconButton
                onPress={() => router.back()}
                icon={
                  <Image
                    style={{ tintColor: appColors.primary }}
                    source={require("@/assets/icons/left_chevron.png")}
                  />
                }
                ContainerStyling={{
                  paddingHorizontal: 10,
                  marginBottom: 10,
                  marginLeft: 14,
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(my_account)"
        options={{
          title: "My Account",
          tabBarLabelStyle: { fontFamily: appFonts.regular },
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/icons/profile.png")}
              style={{ tintColor: color }}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    marginRight: SIZES.large,
    gap: SIZES.small,
  },
});
