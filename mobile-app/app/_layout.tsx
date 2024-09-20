import { AppDataProvider } from "@/context/AppDataContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { OrderProvider } from "@/context/OrdersContext";
import { ProductProvider } from "@/context/ProductContext";
import { ReviewsProvider } from "@/context/ReviewsContext";
import { ServiceProvider } from "@/context/ServiceContext";
import { ShopsContext, ShopsProvider } from "@/context/ShopsContext";
import { UserProvider } from "@/context/UserContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    BarlowCondensedThin: require("../assets/fonts/barlowCondensed/BarlowCondensed-Thin.ttf"),
    BarlowCondensedRegular: require("../assets/fonts/barlowCondensed/BarlowCondensed-Regular.ttf"),
    BarlowCondensedBold: require("../assets/fonts/barlowCondensed/BarlowCondensed-SemiBold.ttf"),
    MontserratThin: require("../assets/fonts/montserrat/Montserrat-Thin.ttf"),
    MontserratRegular: require("../assets/fonts/montserrat/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/montserrat/Montserrat-Bold.ttf"),
    PoppinsThin: require("../assets/fonts/poppins/Poppins-Thin.ttf"),
    PoppinsRegular: require("../assets/fonts/poppins/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/poppins/Poppins-Bold.ttf"),
    PlayfairDisplayThin: require("../assets/fonts/playfairDisplay/PlayfairDisplay-Regular.ttf"),
    PlayfairDisplayRegular: require("../assets/fonts/playfairDisplay/PlayfairDisplay-Medium.ttf"),
    PlayfairDisplayBold: require("../assets/fonts/playfairDisplay/PlayfairDisplay-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ShopsProvider>
      <AuthProvider>
        <UserProvider>
          <AppDataProvider>
            <CategoryProvider>
              <ProductProvider>
                <ServiceProvider>
                  <CartProvider>
                    <ReviewsProvider>
                      <OrderProvider>
                        <Stack>
                          <Stack.Screen
                            name="(main)/(tabs)"
                            options={{
                              headerShown: false,
                            }}
                          />
                          <Stack.Screen
                            name="modals/login-modal"
                            options={{ presentation: "modal" }}
                          />
                          <Stack.Screen
                            name="modals/register-modal"
                            options={{ presentation: "modal" }}
                          />
                          <Stack.Screen
                            name="(auth)/index"
                            options={{
                              headerShown: false,
                            }}
                          />
                          <Stack.Screen
                            name="splashScreen"
                            options={{ headerShown: false }}
                          />
                        </Stack>
                      </OrderProvider>
                    </ReviewsProvider>
                  </CartProvider>
                </ServiceProvider>
              </ProductProvider>
            </CategoryProvider>
          </AppDataProvider>
        </UserProvider>
      </AuthProvider>
    </ShopsProvider>
  );
}
