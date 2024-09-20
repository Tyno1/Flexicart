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
import { ServiceContext } from "@/context/ServiceContext";
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
  FlatList,
  Alert,
} from "react-native";

type ServiceType = {
  name: string;
  price: string;
  description: string;
  imageUrls: any[];
  category: any;
  _id?: string;
  duration: number;
};

export default function ServiceDetails() {
  const { height: windowHeight } = Dimensions.get("window");
  const { user } = useContext(AuthContext);
  const { setSelectedService, serviceAverageRating, getServiceAverageRating } =
    useContext(ServiceContext);
  const { cart, updateCart, createCart } = useContext(CartContext);
  const { shopData } = useContext(ShopsContext);
  const { id } = useGlobalSearchParams();
  const { appColors, appFonts } = useContext(AppDataContext);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [serviceInCart, setServiceInCart] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<any>();
  const [reviewTypeTracker, setReviewTypeTracker] = useState("service");

  const navigate = (link: any, id: string) => {
    router.replace({ pathname: link, params: { id } });
  };

  const handleRelatedCardPress = (item: any) => {
    navigate("/services/[id]", item._id);
    setSelectedService(item);
  };

  const {
    data: service,
    error: serviceError,
    loading: serviceLoading,
    refresh: serviceRefresh,
  } = useFetch<ServiceType>(`${apiUrl}/services/${id}`);

  // Fetching services by categoryId
  const {
    data: services,
    error: servicesError,
    loading: servicesLoading,
    refresh: servicesRefresh,
  } = useFetch<[ServiceType]>(
    `${apiUrl}/services/category/${service?.category?._id}`
  );

  const handleAddToCart = async () => {
    if (!user?.user?._id || !service?._id || !shopData?._id) {
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
      serviceId: service._id,
      quantity: quantity,
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

  const handleDecrement = (item: any) => {
    if (item.quantity > 1) {
      const payload = {
        service: {
          serviceId: item?.serviceId._id,
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

  const handleIncrement = (item: any) => {
    if (item?.quantity > 0) {
      const payload = {
        service: {
          serviceId: item?.serviceId._id,
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
    if (cart && cart.services && service) {
      const item = cart?.services?.filter(
        (item) => item?.serviceId?._id === service?._id
      );
      setCartItem(item);
    }
  }, [cart, service]);

  useEffect(() => {
    if (cart && cart.services && service) {
      const isServiceInCart = cart.services.some(
        (item) => item.serviceId._id === service._id
      );
      setServiceInCart(isServiceInCart);
    }
  }, [cart, service]);

  useEffect(() => {
    if (service) {
      servicesRefresh();
    }
  }, [service]);

  useEffect(() => {
    serviceRefresh();
  }, []);

  const imageSource =
    service && service?.imageUrls.length >= 1
      ? { uri: service?.imageUrls[0]?.image }
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
      {serviceLoading ? (
        <ActivityIndicator size="large" color={appColors.primary} />
      ) : serviceError ? (
        <Text>Sorry, something went wrong</Text>
      ) : (
        <ScrollView style={styles.container}>
          <Image
            source={imageSource}
            style={{ ...styles.image, height: windowHeight * 0.5 }}
          />

          <View style={styles.detailsContainer}>
            <View style={styles.topSection}>
              <Text style={{ ...styles.name, fontFamily: appFonts.bold }}>
                {service?.name}
              </Text>
              <Text style={{ ...styles.price, fontFamily: appFonts.bold }}>
                £{service?.price}
              </Text>
            </View>
            <View style={styles.duration}>
              <Text
                style={{ ...styles.durationText, fontFamily: appFonts.bold }}
              >
                Duration: {service?.duration}
                {service && service.duration > 1 ? " hours" : " hour"}
              </Text>
            </View>
            <View>
              <Text
                numberOfLines={isDescriptionExpanded ? undefined : 4}
                style={{ ...styles.description, fontFamily: appFonts.regular }}
              >
                {service?.description}
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
            productInCart={serviceInCart}
            setQuantity={setQuantity}
            quantity={quantity}
            handleAddToCart={handleAddToCart}
            HandleIncreament={handleIncrement}
            HandleDecreament={handleDecrement}
            cartItem={cartItem}
          />

          <Reviews
            id={id}
            reviewTypeTracker={reviewTypeTracker}
            serviceAverageRating={serviceAverageRating}
            getServiceAverageRating={getServiceAverageRating}
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
              <Text style={styles.relatedTitle}>Related Services</Text>
              <TextButton
                title="View All"
                styling={{ color: appColors.primary }}
              />
            </View>
            <View style={styles.relatedServicesContainer}>
              {services && (
                <FlatList
                  data={services}
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
              {/* Add related services here */}
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
    marginBottom: SIZES.small,
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
  duration: {
    marginBottom: SIZES.small,
    marginRight: "auto",
    padding: SIZES.xSmall,
    backgroundColor: COLORS.gray,
    borderRadius: SIZES.small,
  },
  durationText: {
    fontSize: SIZES.small,
    fontWeight: "bold",
    color: COLORS.white,
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
    fontWeight: "bold",
  },
  relatedServicesContainer: {
    marginTop: SIZES.medium,
  },
});
