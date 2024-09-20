import { COLORS } from "@/constants/themes";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const { width: windowWidth } = Dimensions.get("window");

export default function BannerContainer({ appData, loading }: any) {

  return (
    <View style={styles.container}>
      {appData && appData?.banners?.length > 0 ? (
        <FlatList
          data={appData?.banners}
          renderItem={({ item: banner }) =>
            loading ? (
              <ActivityIndicator color={COLORS.black} />
            ) : (
              <Image
                // remember to sort out
                source={banner.image && { uri: banner?.image }}
                style={styles.image}
              />
            )
          }
          keyExtractor={(banner) => banner._id} // Use a unique key for banners
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      ) : (
        <Image
          // remember to sort out
          source={require("@/assets/images/default_banner.png")}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: windowWidth, // Set the width of the image to the window width
    height: (windowWidth * 9) / 16, // Maintain the aspect ratio (16:9)
    resizeMode: "cover",
  },
});
