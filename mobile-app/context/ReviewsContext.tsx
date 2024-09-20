import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { ShopsContext } from "./ShopsContext";
import { AuthContext } from "./AuthContext";

export type ReviewProp = {
  product?: string;
  service?: string;
  rating: number;
  comment: string;
  user?: any;
};

type ReviewContextProps = {
  reviews: any[];
  error: any;
  isLoading: boolean;
  setError: (error: any) => void;
  setIsLoading: (isLoading: boolean) => void;
  setReviews: (reviews: ReviewProp[]) => void;
  createReview: (payload: ReviewProp) => Promise<any>;
  deleteReview: (reviewId: string) => void;
  updateReview: (reviewId: string, payload: ReviewProp) => any;
};

export const ReviewsContext = createContext({} as ReviewContextProps);

type ReviewsProviderProps = {
  children: React.ReactNode;
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const ReviewsProvider = ({ children }: ReviewsProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<ReviewProp[]>([]);
  const [error, setError] = useState(null);
  const { shopData } = useContext(ShopsContext);
  const { user } = useContext(AuthContext);

  const createReview = (payload: ReviewProp) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .post(`${apiUrl}/reviews`, payload, {
          headers: {
            "x-shop-id": shopData?._id,
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setIsLoading(false);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          setIsLoading(false);
          setError(error);
        });
    });
  };

  const updateReview = async (reviewId: string, payload: ReviewProp) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .put(`${apiUrl}/reviews/${reviewId}`, payload, {
          headers: {
            "x-shop-id": shopData?._id,
          },
        })
        .then((response) => {
          setReviews(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    });
  };

  const deleteReview = async (reviewId: string) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .delete(`${apiUrl}/reviews/${reviewId}`, {
          headers: {
            "x-shop-id": shopData?._id,
          },
        })
        .then((response) => {
          setReviews(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    });
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        setError,
        setReviews,
        error,
        isLoading,
        setIsLoading,
        createReview,
        deleteReview,
        updateReview,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};
