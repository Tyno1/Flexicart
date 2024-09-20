import TextButton from "@/components/Buttons/TextButton";
import CategoryCard from "@/components/CategoryCard";
import LargeCard from "@/components/LargeCard";
import { SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { CategoryContext } from "@/context/CategoryContext";
import { Stack, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Category() {
  const { appColors, appFonts } = useContext(AppDataContext);
  const { categories, selectedCategory, setSelectedCategory } =
    useContext(CategoryContext);
  const [selectedCategoryType, setSelectedCategoryType] =
    useState<string>("Products");

  const [filteredCategories, setFilteredCategories] = useState<any>([]);

  const handleCardPress = (value: any) => {
    setSelectedCategory(value);
    if (value.type === "Product") {
      router.push("/products");
    } else {
      router.push("/services");
    }
  };

  const handleToggleCategory = (value: string) => {
    setSelectedCategoryType(value);
  };

  useEffect(() => {
    if (categories && categories.length > 0 && selectedCategoryType) {
      const filtered = categories.filter(
        (category) =>
          category.type ===
          selectedCategoryType.substring(0, selectedCategoryType.length - 1)
      );
      setFilteredCategories(filtered);
    }
  }, [categories, selectedCategoryType]);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Category",
          headerStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={filteredCategories}
          renderItem={({ item }) => (
            <CategoryCard
              handleCardPress={handleCardPress}
              item={item}
              appFonts={appFonts}
            />
          )}
          ListEmptyComponent={
            <View>
              <Text
                style={{
                  ...styles.title,
                  color: appColors.primary,
                  fontFamily: appFonts.regular,
                }}
              >
                No Categories found
              </Text>
            </View>
          }
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponentStyle={{ marginBottom: SIZES.small }}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text
                style={{
                  ...styles.title,
                  color: appColors.primary,
                  fontFamily: appFonts.bold,
                }}
              >
                Categories
              </Text>
              <View
                style={{
                  ...styles.buttonsContainer,
                  backgroundColor: `${appColors.primary}20`,
                }}
              >
                <TextButton
                  onPress={() => handleToggleCategory("Products")}
                  ContainerStyling={
                    selectedCategoryType === "Products"
                      ? {
                          backgroundColor: appColors.primary,
                          marginVertical: 0,
                          paddingVertical: SIZES.small,
                          paddingHorizontal: SIZES.xLarge,
                          borderRadius: SIZES.xxLarge,
                        }
                      : {
                          marginVertical: 0,
                          paddingVertical: SIZES.small,
                          paddingHorizontal: SIZES.xLarge,
                          borderRadius: SIZES.xxLarge,
                        }
                  }
                  styling={
                    selectedCategoryType === "Products"
                      ? {
                          fontSize: SIZES.small,
                          color: "white",
                          fontFamily: appFonts.bold,
                        }
                      : {
                          fontSize: SIZES.small,
                          color: appColors.primary,
                          fontFamily: appFonts.bold,
                        }
                  }
                  title="Products"
                />
                <TextButton
                  onPress={() => handleToggleCategory("Services")}
                  ContainerStyling={
                    selectedCategoryType === "Services"
                      ? {
                          backgroundColor: appColors.primary,
                          marginVertical: 0,
                          paddingVertical: SIZES.small,
                          paddingHorizontal: SIZES.xLarge,
                          borderRadius: SIZES.xxLarge,
                        }
                      : {
                          marginVertical: 0,
                          paddingVertical: SIZES.small,
                          paddingHorizontal: SIZES.xLarge,
                          borderRadius: SIZES.xxLarge,
                        }
                  }
                  styling={
                    selectedCategoryType === "Services"
                      ? {
                          fontSize: SIZES.small,
                          color: "white",
                          fontFamily: appFonts.bold,
                        }
                      : {
                          fontSize: SIZES.small,
                          color: appColors.primary,
                          fontFamily: appFonts.bold,
                        }
                  }
                  title="Services"
                />
              </View>
            </View>
          }
          stickyHeaderIndices={[0]}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: SIZES.large,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "flex-start",
    backgroundColor: "#fff",
    marginBottom: SIZES.large,
  },
  title: {
    fontSize: 20,
    marginBottom: SIZES.small,
  },
  buttonsContainer: {
    flexDirection: "row",
    borderRadius: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
