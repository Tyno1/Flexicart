import AddToCart from "@/components/AddToCart";
import CartIconTop from "@/components/Buttons/CartIconTop";
import IconButton from "@/components/Buttons/IconButton";
import TextButton from "@/components/Buttons/TextButton";
import Reviews from "@/components/Reviews";
import SmallCard from "@/components/SmallCard";
import { COLORS, SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { AuthContext } from "@/context/AuthContext";
import { CartContext } from "@/context/CartContext";
import { ProductContext } from "@/context/ProductContext";
import { ShopsContext } from "@/context/ShopsContext";
import useFetch from "@/hooks/useFetch";
import { Stack, router, useGlobalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

type ProductType = {
  name: string;
  price: string;
  description: string;
  imageUrls: any[];
  category: any;
  _id?: string;
};
export default function ProductDetails() {
  const { height: windowHeight } = Dimensions.get("window");
  const { user } = useContext(AuthContext);
  const { setSelectedProduct, getProductAverageRating, productAverageRating } =
    useContext(ProductContext);
  const { cart, createCart, setCart, updateCart } = useContext(CartContext);
  const { shopData } = useContext(ShopsContext);
  const { id } = useGlobalSearchParams();
  const { appColors, appFonts } = useContext(AppDataContext);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [productInCart, setProductInCart] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<any>();
  const [reviewTypeTracker, setReviewTypeTracker] = useState("product");

  const navigate = (link: any, id: string) => {
    router.replace({ pathname: link, params: { id } });
  };

  const handleRelatedCardPress = (item: any) => {
    navigate("/products/[id]", item._id);
    setSelectedProduct(item);
  };

  const {
    data: product,
    error: productError,
    loading: productLoading,
    refresh: productRefresh,
  } = useFetch<ProductType>(`${apiUrl}/products/${id}`);

  //   fetching products by categoryId
  const {
    data: products,
    error: productsError,
    loading: productsLoading,
    refresh: productsRefresh,
  } = useFetch<[ProductType]>(
    `${apiUrl}/products/category/${product?.category?._id}`
  );

  const handleAddToCart = async () => {
    if (!user?.user?._id || !product?._id || !shopData?._id) {
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
      productId: product._id,
      quantity: quantity,
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

  const HandleDecreament = (item: any) => {
    if (item.quantity > 1) {
      const payload = {
        product: {
          productId: item?.productId._id,
          quantity: item?.quantity - 1,
        },
      };
      if (cart && cart._id) {
        try {
          updateCart(payload, cart._id);
          console.log("Cart updated successfully");
        } catch (error) {
          console.error("Error updating cart:", error);
        }
      }
    }
  };
  const HandleIncreament = (item: any) => {
    if (item?.quantity > 0) {
      const payload = {
        product: {
          productId: item?.productId._id,
          quantity: item?.quantity + 1,
        },
      };
      if (cart && cart._id) {
        try {
          updateCart(payload, cart._id);
          console.log("Cart updated successfully");
        } catch (error) {
          console.error("Error updating cart:", error);
        }
      }
    }
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  useEffect(() => {
    if (cart && cart.products && product) {
      const item = cart?.products?.filter(
        (item) => item?.productId?._id === product?._id
      );
      setCartItem(item);
    }
  }, [cart, product]);

  useEffect(() => {
    if (cart && cart.products && product) {
      const isProductInCart = cart.products.some(
        (item) => item.productId._id === product._id
      );
      setProductInCart(isProductInCart);
    }
  }, [cart, product]);

  useEffect(() => {
    if (product) {
      productsRefresh();
    }
  }, [product]);

  useEffect(() => {
    productRefresh();
  }, []);

  const imageSource =
    product && product?.imageUrls.length >= 1
      ? { uri: product?.imageUrls[0]?.image }
      : require("@/assets/images/item_placeholder.png");

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: false,
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
      {productLoading ? (
        <ActivityIndicator size="large" color={appColors.primary} />
      ) : productError ? (
        <Text>Sorry Something went wrong</Text>
      ) : (
        <ScrollView style={styles.container}>
          <Image
            source={imageSource}
            style={{ ...styles.image, height: windowHeight * 0.5 }}
          />

          <View style={styles.detailsContainer}>
            <View style={styles.topSection}>
              <Text style={{ ...styles.name, fontFamily: appFonts.bold }}>
                {product?.name}
              </Text>
              <Text style={{ ...styles.price, fontFamily: appFonts.bold }}>
                £{product?.price}
              </Text>
            </View>
            <View>
              <Text
                numberOfLines={isDescriptionExpanded ? undefined : 4}
                style={{ ...styles.description, fontFamily: appFonts.regular }}
              >
                {product?.description}
              </Text>
              {isDescriptionExpanded ? (
                <TextButton
                  title="Collapse"
                  ContainerStyling={{ backgroundColor: appColors.primary }}
                  styling={{ fontFamily: appFonts.bold }}
                  onPress={toggleDescription}
                  color="white"
                />
              ) : (
                <TextButton
                  title="Read More"
                  ContainerStyling={{ backgroundColor: appColors.primary }}
                  styling={{ fontFamily: appFonts.bold }}
                  onPress={toggleDescription}
                />
              )}
            </View>
          </View>

          <AddToCart
            productInCart={productInCart}
            setQuantity={setQuantity}
            quantity={quantity}
            handleAddToCart={handleAddToCart}
            HandleIncreament={HandleIncreament}
            HandleDecreament={HandleDecreament}
            cartItem={cartItem}
          />

          <Reviews
            id={id}
            reviewTypeTracker={reviewTypeTracker}
            getProductAverageRating={getProductAverageRating}
            productAverageRating={productAverageRating}
            appFonts={appFonts}
          />

          <View style={styles.relatedSection}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ ...styles.relatedTitle, fontFamily: appFonts.bold }}
              >
                Related Products
              </Text>
              <TextButton
                title="View All"
                styling={{ color: appColors.black, fontFamily: appFonts.bold }}
              />
            </View>
            <View>
              {products && (
                <FlatList
                  data={products}
                  renderItem={({ item }) => (
                    <SmallCard
                      handleCardPress={() => handleRelatedCardPress(item)}
                      product={item}
                      appFonts={appFonts}
                    />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.xLarge,
    marginBottom: SIZES.large,
  },
  name: {
    flex: 4,
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
  },
  price: {
    flex: 2,
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    textAlign: "right",
  },
  description: {
    fontSize: SIZES.medium,
    lineHeight: 20,
    textAlign: "justify",
    color: COLORS.gray,
  },
  seeAllButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  relatedSection: {
    paddingHorizontal: 10,
    marginVertical: SIZES.medium,
  },
  relatedTitle: {
    fontSize: SIZES.medium,
  },
});
