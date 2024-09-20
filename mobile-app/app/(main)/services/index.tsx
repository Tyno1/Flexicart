import CartIconTop from "@/components/Buttons/CartIconTop";
import IconButton from "@/components/Buttons/IconButton";
import LargeCard from "@/components/LargeCard";
import { SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { AuthContext } from "@/context/AuthContext";
import { CartContext } from "@/context/CartContext";
import { CategoryContext } from "@/context/CategoryContext";
import { ServiceContext } from "@/context/ServiceContext";
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

export default function Services() {
  const { appColors, appFonts } = useContext(AppDataContext);
  const { user } = useContext(AuthContext);
  const { shopData } = useContext(ShopsContext);
  const { cart, updateCart, createCart } = useContext(CartContext);
  const {
    services,
    getServicesByCategoryId,
    setSelectedService,
    setServices,
    setAllServices,
    isLoading,
    error,
  } = useContext(ServiceContext);
  const { categories, selectedCategory, setSelectedCategory } =
    useContext(CategoryContext);
  const [filteredCategories, setFilteredCategories] = useState<any>([]);

  const handleSelectCategory = (item: any) => {
    if (item.name === "All") {
      setSelectedCategory(null);
      setAllServices(true);
    } else {
      setAllServices(false);
      setSelectedCategory(item);
    }
  };

  const navigate = (link: any, id: string) => {
    router.push({ pathname: link, params: { id } });
  };

  const handleCardPress = (item: any) => {
    navigate("/services/[id]", item._id);
    setSelectedService(item);
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
            onPress: () => router.push("/login"),
          },
        ],
        { cancelable: true }
      );
      return;
    }

    const newService = {
      serviceId: item?._id,
      quantity: 1,
    };

    if (cart && cart._id) {
      const payload = {
        service: newService,
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
        services: [newService],
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
      getServicesByCategoryId(selectedCategory?._id)
        .then((response: any) => {
          setServices(response?.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const filtered = [
        { name: "All" },
        ...categories.filter((category) => category.type === "Service"),
      ];
      setFilteredCategories(filtered);
    }
  }, [categories]);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Services",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
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
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <LargeCard
              cart={cart}
              handleCardPress={handleCardPress}
              handleAddToCart={handleAddToCart}
              item={item}
            />
          )}
          ListEmptyComponent={
            <View>
              <Text
                style={{
                  ...styles.title,
                  color: appColors.primary,
                  fontFamily: appFonts.bold,
                }}
              >
                No Services found
              </Text>
            </View>
          }
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
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
                Services
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
                keyExtractor={(item) => item._id}
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
    color: "black",
  },
});
