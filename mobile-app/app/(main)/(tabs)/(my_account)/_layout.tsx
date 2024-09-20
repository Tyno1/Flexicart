import IconButton from "@/components/Buttons/IconButton";
import { SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { Stack, router } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";

const Layout = () => {
  const { appColors } = useContext(AppDataContext);
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerRight: () => (
          <View style={styles.iconContainer}>
            <IconButton
              testID="search-button"
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
  );
};

export default Layout;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    gap: SIZES.small,
    maxHeight: 50,
  },
});
