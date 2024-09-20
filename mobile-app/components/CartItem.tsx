import { COLORS, SIZES } from "@/constants/themes";
import React, { useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import IconButton from "./Buttons/IconButton";
import { AppDataContext } from "@/context/AppDataContext";
import { UpdateProp } from "@/context/CartContext";
import { ServiceContext } from "@/context/ServiceContext";
import { ProductContext } from "@/context/ProductContext";
import { router } from "expo-router";

type CartItemProp = {
  item: any;
  updateCart: (payload: UpdateProp, cartId: string) => Promise<void>;
  cart: any;
  deleteCartItem: (payload: UpdateProp, cartId: string) => Promise<void>;
  itemType: "Product" | "Service"; // Add itemType prop
};

export default function CartItem({
  item,
  updateCart,
  cart,
  deleteCartItem,
  itemType, // Destructure itemType
}: CartItemProp) {
  const { appColors, appFonts } = useContext(AppDataContext);
  const { setSelectedService } = useContext(ServiceContext);
  const { setSelectedProduct } = useContext(ProductContext);

  const navigate = (link: any, id: string) => {
    router.push({ pathname: link, params: { id } });
  };

  const handleCardPress = () => {
    if (itemType === "Service") {
      navigate("/services/[id]", item?.serviceId._id);
      setSelectedService(item);
    } else {
      navigate("/products/[id]", item?.productId._id);
      setSelectedProduct(item);
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      let payload: UpdateProp | undefined;
      if (itemType === "Product") {
        payload = {
          product: {
            productId: item.productId._id,
            quantity: item.quantity - 1,
          },
        };
      } else {
        payload = {
          service: {
            serviceId: item.serviceId._id,
            quantity: item.quantity - 1,
          },
        };
      }
      if (payload && cart && cart._id) {
        updateCart(payload, cart._id);
      }
    }
  };

  const handleIncrement = () => {
    if (item.quantity > 0) {
      let payload: UpdateProp | undefined;
      if (itemType === "Product") {
        payload = {
          product: {
            productId: item.productId._id,
            quantity: item.quantity + 1,
          },
        };
      } else {
        payload = {
          service: {
            serviceId: item.serviceId._id,
            quantity: item.quantity + 1,
          },
        };
      }
      if (payload && cart && cart._id) {
        updateCart(payload, cart._id);
      }
    }
  };

  const handleDelete = () => {
    let payload;
    if (itemType === "Product") {
      payload = {
        product: {
          productId: item.productId._id,
          quantity: 0,
        },
      };
    } else {
      payload = {
        service: {
          serviceId: item.serviceId._id,
          quantity: 0,
        },
      };
    }

    if (payload && cart && cart._id) {
      deleteCartItem(payload, cart._id);
    }
  };

  return (
    <View
      style={{ ...styles.container, borderColor: `${appColors.primary}20` }}
    >
      <TouchableOpacity style={styles.imageButton} onPress={handleCardPress}>
        <Image
          source={
            itemType === "Product"
              ? item?.productId?.imageUrls?.[0]?.image
                ? { uri: item?.productId?.imageUrls[0]?.image }
                : require("@/assets/images/item_placeholder.png")
              : item?.serviceId?.imageUrls?.[0]?.image
              ? { uri: item?.serviceId?.imageUrls[0]?.image }
              : require("@/assets/images/item_placeholder.png")
          }
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <View style={styles.topSection}>
          <View style={styles.nameSection}>
            <Text
              numberOfLines={2}
              style={{ ...styles.name, fontFamily: appFonts.bold }}
            >
              {itemType === "Product"
                ? item?.productId?.name
                : item?.serviceId?.name}
            </Text>
            <Text
              style={{
                ...styles.price,
                color: appColors.gray,
                fontFamily: appFonts.regular,
              }}
            >
              £
              {itemType === "Product"
                ? item?.productId?.price
                : item?.serviceId?.price}
            </Text>
          </View>
          <View style={styles.rightSection}>
            <Text style={{ ...styles.totalPrice, fontFamily: appFonts.bold }}>
              £
              {itemType === "Product"
                ? item?.productId?.price * item?.quantity
                : item?.serviceId?.price * item?.quantity}
            </Text>
            {itemType === "Service" && item?.serviceId?.duration && (
              <View style={styles.duration}>
                <Text
                  style={{
                    ...styles.durationText,
                    fontFamily: appFonts.regular,
                  }}
                >
                  Total: {item?.serviceId?.duration * item?.quantity} hours
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.bottomSection}>
          <View
            style={{
              ...styles.increment,
              borderColor: `${appColors.primary}20`,
            }}
          >
            <IconButton
              onPress={handleDecrement}
              icon={
                <Image
                  style={{ tintColor: `${appColors.gray}92` }}
                  source={require("@/assets/icons/minus.png")}
                />
              }
              ContainerStyling={{
                width: SIZES.xxxLarge,
                paddingVertical: 6,
              }}
              styling={{
                color: appColors.primary,
              }}
            />
            <TextInput
              value={String(item.quantity)}
              keyboardType="numeric"
              style={{
                ...styles.quantity,
                color: appColors.gray,
                borderColor: `${appColors.primary}20`,
                fontFamily: appFonts.regular,
              }}
            />
            <IconButton
              onPress={handleIncrement}
              icon={
                <Image
                  style={{ tintColor: `${appColors.gray}92` }}
                  source={require("@/assets/icons/plus.png")}
                />
              }
              ContainerStyling={{ width: SIZES.xxxLarge, paddingVertical: 6 }}
              styling={{ color: appColors.primary }}
            />
          </View>
          <IconButton
            onPress={handleDelete}
            icon={
              <Image
                style={{ tintColor: "red" }}
                source={require("@/assets/icons/delete.png")}
              />
            }
            ContainerStyling={{
              paddingVertical: 0,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: SIZES.xMassive + 14,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.small,
    borderWidth: 1,

    flexDirection: "row",
    padding: 5,
    marginBottom: SIZES.small,
  },
  text: {
    fontSize: 20,
  },
  imageButton: {
    flex: 1.5,
  },
  image: {
    height: "100%",
    resizeMode: "cover",
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.small,
    width: "100%",
  },
  textContainer: {
    height: "100%",
    flex: 5,
    justifyContent: "space-between",
    paddingLeft: SIZES.small,
    paddingRight: SIZES.xSmall,
  },
  increment: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 4,
  },
  quantity: {
    paddingHorizontal: 20,
    alignItems: "center",
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  nameSection: {
    flex: 4,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  rightSection: {
    flex: 2,
    display: "flex",
    alignItems: "flex-end",
    gap: 4,
  },
  totalPrice: {
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  price: {
    fontSize: SIZES.small,
    fontWeight: "bold",
  },
  duration: {
    marginBottom: SIZES.small,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.xSmall,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  durationText: {
    fontSize: SIZES.xSmall,
    fontWeight: "bold",
    color: COLORS.gray,
  },
});
