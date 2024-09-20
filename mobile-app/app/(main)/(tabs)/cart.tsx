import FAB from "@/components/Buttons/Fab";
import TextButton from "@/components/Buttons/TextButton";
import CartItem from "@/components/CartItem";
import { SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { CartContext } from "@/context/CartContext";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Cart() {
  const { appColors, appFonts } = useContext(AppDataContext);
  const { cart, updateCart, deleteCartItem, checkout } =
    useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [selectedCategoryType, setSelectedCategoryType] = useState("Products");

  const productTotal =
    cart?.products?.reduce((total, product) => {
      return total + product?.productId?.price * product?.quantity;
    }, 0) || 0;

  const serviceTotal =
    cart?.services?.reduce((total, service) => {
      return total + service.serviceId.price * service.quantity;
    }, 0) || 0;

  const charges = 0;
  const handleToggleCategory = (value: string) => {
    setSelectedCategoryType(value);
  };

  const handleCheckout = () => {
    checkout(cart)
      .then(async (res) => {
        let result = await WebBrowser.openBrowserAsync(res.data.session.url);
      })
      .catch((err) => {
        console.log(err);
        router.push("/modals/login-modal");
      });
  };

  useEffect(() => {
    setTotal(productTotal + serviceTotal + charges);
  }, [productTotal, serviceTotal, charges]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={{ ...styles.title, fontFamily: appFonts.bold }}>
          Cart Summary
        </Text>
        <View style={styles.sectionContainer}>
          <Text style={{ ...styles.name, fontFamily: appFonts.regular }}>
            Products
          </Text>
          <Text style={{ ...styles.amount, fontFamily: appFonts.bold }}>
            £{productTotal?.toFixed(2)}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{ ...styles.name, fontFamily: appFonts.regular }}>
            Services
          </Text>
          <Text style={{ ...styles.amount, fontFamily: appFonts.bold }}>
            £{serviceTotal?.toFixed(2)}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{ ...styles.name, fontFamily: appFonts.regular }}>
            Charges
          </Text>
          <Text style={{ ...styles.amount, fontFamily: appFonts.bold }}>
            £0.00
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{ ...styles.name, fontFamily: appFonts.regular }}>
            Total
          </Text>
          <Text style={{ ...styles.amount, fontFamily: appFonts.bold }}>
            £{total?.toFixed(2)}
          </Text>
        </View>
      </View>

      <FlatList
        data={
          selectedCategoryType === "Products" ? cart?.products : cart?.services
        }
        renderItem={({ item }) => (
          <CartItem
            cart={cart}
            updateCart={updateCart}
            item={item}
            deleteCartItem={deleteCartItem}
            itemType={
              selectedCategoryType === "Products" ? "Product" : "Service"
            }
          />
        )}
        keyExtractor={(item) =>
          selectedCategoryType === "Products"
            ? item?.productId?._id
            : item?.serviceId?._id
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
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
      <FAB
        title="Checkout"
        testID="Checkout"
        containerStyle={{ backgroundColor: appColors.primary }}
        onPress={() => handleCheckout()}
        textStyle={{ fontFamily: appFonts.bold }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  topSection: {
    marginVertical: 20,
  },
  title: {
    fontSize: 14,
    marginHorizontal: "auto",
    marginBottom: 5,
  },
  sectionContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "normal",
    flex: 1,
  },
  amount: {
    fontSize: 16,
    flex: 1,
    textAlign: "right",
    fontWeight: "bold",
  },
  headerContainer: {
    alignItems: "center",
    marginHorizontal: "auto",
    backgroundColor: "#fff",
    width: "100%",
  },
  buttonsContainer: {
    flexDirection: "row",
    borderRadius: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginBottom: 20,
  },
});
