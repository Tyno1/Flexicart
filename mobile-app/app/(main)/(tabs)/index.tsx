import BannerCarousel from "@/components/BannerCarousel";
import CategorySlider from "@/components/CategorySlider";
import Trending from "@/components/Trending";
import ViewAllButton from "@/components/ViewAllButton";
import { SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { ShopsContext } from "@/context/ShopsContext";
import { Stack } from "expo-router";

import { useContext } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TabOneScreen() {
  const { appData, appColors, appFonts } = useContext(AppDataContext);
  const { shopData } = useContext(ShopsContext);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen
        options={{
          headerLeft: () => {
            if (shopData?.shopDetails?.logo) {
              return (
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: shopData?.shopDetails?.logo }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    ...styles.headerLeft,
                    backgroundColor: appColors.primary,
                  }}
                >
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      color: "white",
                      fontFamily: appFonts.bold,
                    }}
                  >
                    {shopData?.shopDetails?.name}
                  </Text>
                </View>
              );
            }
          },
        }}
      />
      <ScrollView style={styles.container}>
        <CategorySlider />
        <View style={styles.separator} />
        <BannerCarousel />
        <ViewAllButton
          appColors={appColors}
          appFonts={appFonts}
          route="products"
          title="Products"
        />
        <ViewAllButton
          appColors={appColors}
          appFonts={appFonts}
          route="services"
          title="Services"
        />
        <Trending />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: SIZES.small,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  headerLeft: {
    marginLeft: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 10,
  },
  imageContainer: {
    width: SIZES.xxMassive,
    height: 30,
    borderRadius: 5,
    marginLeft: SIZES.small,
  },
});
