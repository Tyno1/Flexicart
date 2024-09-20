import React, { useContext } from "react";
import { Text, StyleSheet, View, Image, FlatList } from "react-native";
import { COLORS, SIZES } from "@/constants/themes";
import { CategoryContext } from "@/context/CategoryContext";
import CategoryContainer from "@/components/CategoryContainer";
import { AppDataContext } from "@/context/AppDataContext";

export default function CategorySlider() {
  const { categories } = useContext(CategoryContext);
  const { appFonts } = useContext(AppDataContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <CategoryContainer appFonts={appFonts} category={item} />
        )}
        contentContainerStyle={styles.flatListContent}
        showsHorizontalScrollIndicator={false} // Hides the horizontal scroll indicator
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  flatListContent: {
    paddingHorizontal: SIZES.small,
  },
});
