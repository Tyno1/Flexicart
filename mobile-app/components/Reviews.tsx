import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CreateReview from "./CreateReview";
import { SIZES } from "@/constants/themes";
import useFetch from "@/hooks/useFetch";
import ProductReviewsList from "./ProductReviewsList";
import ServiceReviewsList from "./ServiceReviewsList";

export type ReviewProp = {
  id: string;
  reviewTypeTracker: string;
  getProductAverageRating?: (productId: string) => Promise<unknown>;
  getServiceAverageRating?: (serviceId: string) => Promise<unknown>;
  productAverageRating?: number;
  serviceAverageRating?: number;
  appFonts: any;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Reviews({
  id,
  reviewTypeTracker,
  productAverageRating,
  serviceAverageRating,
  getProductAverageRating,
  getServiceAverageRating,
  appFonts,
}: ReviewProp) {
  const productFetchUrl = `${apiUrl}/reviews/product/${id}`;
  const serviceFetchUrl = `${apiUrl}/reviews/service/${id}`;

  const {
    data: productReviews,
    loading: productLoading,
    error: productError,
    refresh: productRefresh,
  } = useFetch(reviewTypeTracker === "product" ? productFetchUrl : "");

  const {
    data: serviceReviews,
    loading: serviceLoading,
    error: serviceError,
    refresh: serviceRefresh,
  } = useFetch(reviewTypeTracker === "service" ? serviceFetchUrl : "");

  useEffect(() => {
    if (typeof id === "string") {
      if (reviewTypeTracker === "product") {
        getProductAverageRating?.(id);
      } else {
        getServiceAverageRating?.(id);
      }
    }
  }, [productReviews, serviceReviews]);

  return (
    <View style={styles.container}>
      {reviewTypeTracker === "product" ? (
        <ProductReviewsList
          productReviews={productReviews}
          productLoading={productLoading}
          productError={productError}
          productAverageRating={productAverageRating}
          appFonts={appFonts}
        />
      ) : (
        <ServiceReviewsList
          serviceReviews={serviceReviews}
          serviceLoading={serviceLoading}
          serviceError={serviceError}
          serviceAverageRating={serviceAverageRating}
          appFonts={appFonts}
        />
      )}
      <CreateReview
        id={id}
        reviewTypeTracker={reviewTypeTracker}
        productRefresh={productRefresh}
        serviceRefresh={serviceRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,
    flex: 1,
    width: "100%",
  },
});
