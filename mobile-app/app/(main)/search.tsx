import IconButton from "@/components/Buttons/IconButton";
import TextButton from "@/components/Buttons/TextButton";
import SearchResult from "@/components/SearchCards";
import SearchCards from "@/components/SearchCards";
import { COLORS, SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { ProductContext } from "@/context/ProductContext";
import { ServiceContext } from "@/context/ServiceContext";
import { Stack, router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    searchResult: ProductsSearchResult,
    setSearchResult: setProductSearchResult,
    error: ProductsError,
    isLoading: ProductsLoading,
    searchProductsByName,
    setSelectedProduct,
  } = useContext(ProductContext);
  const {
    searchResult: ServicesSearchResult,
    setSearchResult: setServiceSearchResult,
    error: ServicesError,
    isLoading: ServicesLoading,
    searchServicesByName,
    setSelectedService,
  } = useContext(ServiceContext);
  const { appColors, appFonts } = useContext(AppDataContext);

  const navigate = (link: any, id: string) => {
    router.push({ pathname: link, params: { id } });
  };

  const handleCardPress = (item: any) => {
    if (item?.category?.type === "Product") {
      navigate("/products/[id]", item._id);
      setSelectedProduct(item);
    } else if (item?.category?.type === "Service") {
      navigate("/services/[id]", item._id);
      setSelectedService(item);
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      searchProductsByName(searchQuery);
      searchServicesByName(searchQuery);
    }
  };

  const searchResults = [...ProductsSearchResult, ...ServicesSearchResult];

  useEffect(() => {
    if (searchQuery === "") {
      setProductSearchResult([]);
      setServiceSearchResult([]);
    }
  }, [searchQuery]);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "search",
          headerTitleStyle: { color: appColors.primary },
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
                }}
              />
            </View>
          ),
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <TextInput
            style={{ ...styles.input, fontFamily: appFonts.regular }}
            placeholder="search for products or services"
            placeholderTextColor={appColors.gray2}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TextButton
            onPress={handleSearch}
            title="Search"
            ContainerStyling={{ backgroundColor: appColors.primary }}
            styling={{ fontFamily: appFonts.bold }}
          />

          <View style={styles.bottomSection}>
            {searchResults.length > 0 ? (
              <>
                <Text
                  style={{
                    ...styles.searchHeading,
                    fontFamily: appFonts.bold,
                  }}
                >
                  Search Result
                </Text>
                <FlatList
                  data={searchResults}
                  renderItem={({ item }) => (
                    <SearchCards
                      handleCardPress={handleCardPress}
                      item={item}
                    />
                  )}
                  keyExtractor={(item) => item?._id}
                  showsVerticalScrollIndicator={false}
                />
              </>
            ) : (
              <View
                style={{ marginHorizontal: "auto", marginVertical: "auto" }}
              >
                <Text
                  style={{ color: appColors.primary, fontSize: SIZES.large, fontFamily: appFonts.bold }}
                >
                  No Search Results Found
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: SIZES.massive,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "100%",
  },
  searchHeading: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: 16,
    marginBottom: 8,
  },
  bottomSection: {
    flex: 1,
  },
});
