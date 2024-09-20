import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SIZES } from "@/constants/themes";
import { ReviewsContext } from "@/context/ReviewsContext";
import { FontAwesome } from "@expo/vector-icons";
import useFetch from "@/hooks/useFetch";

type ReviewsListprops = {
  serviceReviews: any;
  serviceLoading: boolean;
  serviceError: any;
  serviceAverageRating: number | undefined;
  appFonts: any;
};

export default function ServiceReviewsList({
  serviceReviews,
  serviceLoading,
  serviceError,
  serviceAverageRating,
  appFonts,
}: ReviewsListprops) {
  const renderStars = (rating: number) => {
    return (
      <View style={styles.starContainer}>
        {[...Array(5)].map((_, index) => (
          <FontAwesome
            key={index}
            name={index < rating ? "star" : "star-o"}
            size={16}
            color="#FFA41C"
            style={styles.star}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={{ ...styles.title, fontFamily: appFonts.bold }}>
          Customer Reviews
        </Text>
      </View>

      <View style={styles.ratingSummary}>
        <Text style={{ ...styles.ratingText, fontFamily: appFonts.bold }}>
          {serviceAverageRating} out of 5
        </Text>
        <Text style={{ ...styles.ratingText, fontFamily: appFonts.regular }}>
          Based on {serviceReviews?.length}{" "}
          {serviceReviews?.length > 1 ? "reviews" : "review"}
        </Text>
      </View>

      <View style={styles.reviews}>
        {serviceReviews?.length > 0 ? (
          serviceReviews.map((review: any, index: any) => (
            <View key={index} style={styles.reviewContainer}>
              <View style={styles.userInfo}>
                <Text style={{ ...styles.userName, fontFamily: appFonts.bold }}>
                  {review?.user?.name || "Anonymous"}
                </Text>
                <Text
                  style={{ ...styles.reviewDate, fontFamily: appFonts.regular }}
                >
                  {new Date(review?.createdAt).toLocaleDateString()}
                </Text>
              </View>
              {renderStars(review?.rating)}
              <Text
                style={{
                  fontFamily: appFonts.regular,
                }}
              >
                {review?.comment}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ ...styles.noReviews, fontFamily: appFonts.bold }}>
            No reviews available.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: SIZES.medium,
  },
  topSection: {
    marginBottom: SIZES.large,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: SIZES.medium,
  },
  title: {
    fontSize: SIZES.large,
  },
  ratingSummary: {
    marginBottom: SIZES.large,
    alignItems: "center",
  },
  ratingText: {
    fontSize: SIZES.medium,
  },
  reviews: {
    marginTop: SIZES.medium,
  },
  reviewContainer: {
    backgroundColor: "#FFF",
    padding: SIZES.medium,
    marginBottom: SIZES.medium,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.small,
  },
  userName: {
    fontSize: SIZES.medium,
    color: "#000",
  },
  reviewDate: {
    fontSize: SIZES.small,
    color: "#555",
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: SIZES.small,
  },
  star: {
    color: "#FFA41C",
    fontSize: 16,
    marginRight: 2,
  },
  reviewComment: {
    fontSize: SIZES.medium,
    color: "#333",
    marginTop: SIZES.small,
  },
  noReviews: {
    fontSize: SIZES.medium,
    color: "#555",
    textAlign: "center",
  },
});
