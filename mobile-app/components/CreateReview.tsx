import { COLORS, SIZES } from "@/constants/themes";
import { AppDataContext } from "@/context/AppDataContext";
import { ReviewProp, ReviewsContext } from "@/context/ReviewsContext";
import React, { useCallback, useContext, useState } from "react";
import { Text, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import TextButton from "./Buttons/TextButton";
import StarRating from "react-native-star-rating-widget";
import { UserContext } from "@/context/UserContext";
import { router } from "expo-router";

type CreateReviewProp = {
  id: string | string[] | undefined;
  reviewTypeTracker: string;
  productRefresh: () => void;
  serviceRefresh: () => void;
};
export default function CreateReview({
  id,
  reviewTypeTracker,
  productRefresh,
  serviceRefresh,
}: CreateReviewProp) {
  const { createReview } = useContext(ReviewsContext);
  const defaultPayload = { product: "", service: "", rating: 0, comment: "" };
  const [payload, setPayload] = useState<ReviewProp>(defaultPayload);
  const { appColors, appFonts } = useContext(AppDataContext);
  const { userDetails } = useContext(UserContext);

  const handleRatingChange = (value: number) =>
    setPayload({
      ...payload,
      rating: value,
    });

  const handleReviewSubmit = () => {
    if (!userDetails) {
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
    if (payload.rating === 0) {
      alert("Please rate the game");
      return;
    }
    if (payload.comment.trim().length === 0) {
      alert("Please enter a comment");
      return;
    }
    const newPayload = {
      ...payload,
    };

    if (reviewTypeTracker === "product") {
      newPayload.product = id;
      newPayload.service = undefined;
    } else if (reviewTypeTracker === "service") {
      newPayload.service = id;
      newPayload.product = undefined;
    }

    if (newPayload) {
      createReview(newPayload)
        .then((res) => {
          productRefresh();
          serviceRefresh();
          // Clear the form
          setPayload(defaultPayload);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.title, fontFamily: appFonts.bold }}>
        Create a New Review
      </Text>
      <TextInput
        style={{ ...styles.commentInput, fontFamily: appFonts.regular }}
        placeholder="Type comment here"
        onChangeText={(comment) => setPayload({ ...payload, comment })}
        value={payload.comment}
        multiline
      />
      <View style={styles.ratingContainer}>
        <Text style={{ ...styles.ratingLabel, fontFamily: appFonts.bold }}>
          {" "}
          Tap to select a rating
        </Text>
        <StarRating
          rating={payload.rating}
          onChange={handleRatingChange}
          maxStars={5}
          enableHalfStar={false}
        />
      </View>
      <TextButton
        title="Submit Review"
        ContainerStyling={{ backgroundColor: appColors.primary }}
        styling={{ fontFamily: appFonts.bold }}
        onPress={handleReviewSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  rating: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 100,
    gap: 10,
  },
  commentInput: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: SIZES.large,
    width: "100%",
    display: "flex",
    paddingTop: SIZES.large,
    minHeight: 200,
  },
  ratingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: SIZES.small,
    color: COLORS.gray,
  },
});
