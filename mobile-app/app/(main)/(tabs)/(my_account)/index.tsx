import TextButton from "@/components/Buttons/TextButton";
import ProfileButtons from "@/components/ProfileButtons";
import { COLORS, SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { AuthContext } from "@/context/AuthContext";
import { CartContext } from "@/context/CartContext";
import { ShopsContext } from "@/context/ShopsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Stack, router } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const { selectedShop, setSelectedShop, savedShopId, setSavedShopId } =
    useContext(ShopsContext);
  const { user, logout, setUser } = useContext(AuthContext);
  const { appColors, appFonts } = useContext(AppDataContext);
  const { setCart } = useContext(CartContext);

  const handleRegister = () => {};
  const handleLogin = () => {};
  const handleLogout = () => {
    logout();
  };
  const handleStoreSwitch = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
      setSavedShopId(null);
      setSelectedShop(null);
      setCart({
        _id: "",
        userId: "",
        products: [],
        services: [],
        shop: "",
      });
      router.replace("/(auth)");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  const ImageSource = user?.user?.imageUrl
    ? { uri: user.user.imageUrl }
    : require("@/assets/icons/profile.png");

  return (
    <>
      <Stack.Screen options={{ headerTitle: "" }} />
      <ScrollView style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={ImageSource} />
          </View>
          <View>
            <Text
              style={{
                ...styles.title,
                color: appColors.primary,
                fontFamily: appFonts.bold,
              }}
            >
              {user?.user?.fullName || "Not logged in"}
            </Text>
            <Text style={{ ...styles.email, fontFamily: appFonts.regular }}>
              {user?.user?.email || "kindly login"}
            </Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{ ...styles.heading, fontFamily: appFonts.bold }}>
            ACCOUNT
          </Text>

          {user && (
            <ProfileButtons
              onPress={() => router.push("/my_orders")}
              icon={
                <Image
                  style={{ ...styles.iconStyle, tintColor: appColors.primary }}
                  source={require("@/assets/icons/my_orders.png")}
                />
              }
              text="My Orders"
            />
          )}

          <ProfileButtons
            onPress={() => router.push("/returns")}
            icon={
              <Image
                style={{ ...styles.iconStyle, tintColor: appColors.primary }}
                source={require("@/assets/icons/returns.png")}
              />
            }
            text="Returns & Refunds"
          />
          {user && (
            <ProfileButtons
              onPress={() => router.push("/edit_profile")}
              icon={
                <Image
                  style={{ ...styles.iconStyle, tintColor: appColors.primary }}
                  source={require("@/assets/icons/edit_profile.png")}
                />
              }
              text="Edit Profile"
            />
          )}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>SETTINGS</Text>
          {/* <ProfileButtons
            onPress={() => router.push("/settings")}
            icon={
              <Image
                style={{ ...styles.iconStyle, tintColor: appColors.primary }}
                source={require("@/assets/icons/settings.png")}
              />
            }
            text="Settings & Notifications"
          /> */}
          {user ? (
            <ProfileButtons
              icon={
                <Image
                  style={{ ...styles.iconStyle, tintColor: appColors.primary }}
                  source={require("@/assets/icons/logout.png")}
                />
              }
              onPress={handleLogout}
              text="Logout"
            />
          ) : (
            <>
              <ProfileButtons
                asChild
                onPress={() => router.push("/modals/login-modal")}
                icon={
                  <Image
                    style={{
                      ...styles.iconStyle,
                      tintColor: appColors.primary,
                    }}
                    source={require("@/assets/icons/login.png")}
                  />
                }
                text="Login"
              />
              <ProfileButtons
                onPress={() => router.push("/modals/register-modal")}
                asChild
                icon={
                  <Image
                    style={{
                      ...styles.iconStyle,
                      tintColor: appColors.primary,
                    }}
                    source={require("@/assets/icons/register.png")}
                  />
                }
                text="Register"
              />
            </>
          )}
          <ProfileButtons
            icon={
              <Image
                style={{ ...styles.iconStyle, tintColor: appColors.primary }}
                source={require("@/assets/icons/switch_store.png")}
              />
            }
            onPress={handleStoreSwitch}
            text="Switch Store"
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>SUPPORT</Text>
          <ProfileButtons
            onPress={() => router.push("/faq")}
            icon={
              <Image
                style={{ ...styles.iconStyle, tintColor: appColors.primary }}
                source={require("@/assets/icons/faq.png")}
              />
            }
            text="FAQ"
          />
          <ProfileButtons
            onPress={() => router.push("/contact_us")}
            icon={
              <Image
                style={{ ...styles.iconStyle, tintColor: appColors.primary }}
                source={require("@/assets/icons/contact_us.png")}
              />
            }
            text="Contact Us"
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.small,
    backgroundColor: "white",
  },
  title: {
    fontSize: SIZES.large,
  },
  email: {
    marginTop: 2,
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  topSection: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "black",
    marginRight: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    borderRadius: 60,
  },
  sectionContainer: {
    width: "100%",
    marginBottom: 20,
  },
  heading: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  iconStyle: {
    resizeMode: "contain",
    width: "60%",
    height: "60%",
  },
});
