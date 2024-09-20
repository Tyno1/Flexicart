import CartButton from "@/components/Buttons/CartButton";
import CartIconTop from "@/components/Buttons/CartIconTop";
import IconButton from "@/components/Buttons/IconButton";
import LargeCard from "@/components/LargeCard";
import { COLORS, SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { AuthContext } from "@/context/AuthContext";
import { CartContext } from "@/context/CartContext";
import { CategoryContext } from "@/context/CategoryContext";
import { ProductContext } from "@/context/ProductContext";
import { ShopsContext } from "@/context/ShopsContext";
import { Stack, router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Products() {
  const { appColors, appFonts } = useContext(AppDataContext);
  const { user } = useContext(AuthContext);
  const { shopData } = useContext(ShopsContext);
  const { cart, updateCart, createCart } = useContext(CartContext);
  const {
    products,
    getProductsByCategoryId,
    setAllProducts,
    setSelectedProduct,
    setProducts,
    isLoading,
    error,
  } = useContext(ProductContext);
  const { categories, selectedCategory, setSelectedCategory } =
    useContext(CategoryContext);
  const [filteredCategories, setFilteredCategories] = useState<any>([]);

  const handleSelectCategory = (item: any) => {
    if (item.name === "All") {
      setSelectedCategory(null);
      setAllProducts(true);
    } else {
      setAllProducts(false);
      setSelectedCategory(item);
    }
  };

  const navigate = (link: any, id: string) => {
    router.push({ pathname: link, params: { id } });
  };

  const handleCardPress = (item: any) => {
    navigate("/products/[id]", item._id);
    setSelectedProduct(item);
  };

  const handleAddToCart = async (item: any) => {
    if (!user?.user?._id || !item?._id || !shopData?._id) {
      Alert.alert(
        "Kindly Login",
        "",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Login",
            onPress: () => router.push("/modals/login-modal"),
          },
        ],
        { cancelable: true }
      );
      return;
    }

    const newProduct = {
      productId: item?._id,
      quantity: 1,
    };

    if (cart && cart._id) {
      const payload = {
        product: newProduct,
      };
      try {
        await updateCart(payload, cart._id);
        console.log("Cart updated successfully");
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    } else {
      const payload = {
        userId: user.user._id,
        shop: shopData._id,
        products: [newProduct],
      };
      try {
        await createCart(payload);
        console.log("Cart updated successfully");
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      getProductsByCategoryId(selectedCategory?._id)
        .then((response: any) => {
          setProducts(response?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      // Include 'All' category in the list
      const filtered = [
        { name: "All" },
        ...categories.filter((category) => category.type === "Product"),
      ];
      setFilteredCategories(filtered);
    }
  }, [categories]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Products",
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
          headerRight: () => <CartIconTop />,
          headerStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <LargeCard
              cart={cart}
              handleAddToCart={handleAddToCart}
              handleCardPress={handleCardPress}
              item={item}
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
                No products found
              </Text>
            </View>
          }
          keyExtractor={(item) => item?._id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            <View style={styles.firstSection}>
              <Text
                style={{
                  ...styles.title,
                  color: appColors.primary,
                  fontFamily: appFonts.bold,
                }}
              >
                Products
              </Text>
              <Text
                style={{
                  ...styles.subTitle,
                  color: appColors.primary,
                  fontFamily: appFonts.bold,
                }}
              >
                Explore several items
              </Text>
              <FlatList
                data={filteredCategories}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectCategory(item)}>
                    <View
                      style={
                        selectedCategory?.name === item?.name
                          ? {
                              ...styles.categoryItem,
                              backgroundColor: `${appColors.primary}`,
                            }
                          : {
                              ...styles.categoryItem,
                              backgroundColor: `${appColors.primary}09`,
                            }
                      }
                    >
                      <Text
                        style={
                          selectedCategory?.name === item?.name
                            ? {
                                ...styles.categoryText,
                                color: appColors.white,
                                fontFamily: appFonts.bold,
                              }
                            : {
                                ...styles.categoryText,
                                color: appColors.primary,
                                fontFamily: appFonts.bold,
                              }
                        }
                      >
                        {item?.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item?._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
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
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: SIZES.large,
  },
  firstSection: {
    alignItems: "flex-start",
    marginBottom: SIZES.small,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: SIZES.small,
  },
  subTitle: {
    fontSize: SIZES.small,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: SIZES.small,
  },
  categoryItem: {
    height: SIZES.xxLarge,
    backgroundColor: "#f0f0f0",
    borderRadius: SIZES.xxLarge,
    paddingVertical: 6,
    paddingHorizontal: SIZES.large,
    marginRight: SIZES.medium,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontSize: SIZES.small,
    fontWeight: "bold",
    color: "black",
  },
});
