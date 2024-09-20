import React, { useContext } from "react";
import { StyleSheet, View, Image, FlatList } from "react-native";
import { COLORS, SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import BannerContainer from "./BannerContainer";

export default function BannerCarousel() {
  const { appData, loading } = useContext(AppDataContext);

  return (
    <View style={styles.container}>
      <BannerContainer appData={appData} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
