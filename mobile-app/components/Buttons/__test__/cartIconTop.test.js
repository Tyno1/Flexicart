import { AppDataContext } from "@/context/AppDataContext";
import { CartContext } from "@/context/CartContext";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import CartIconTop from "../CartIconTop";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

// Mock the required contexts and router
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

const mockAppColors = {
  primary: "#FF0000",
};

const mockCart = {
  products: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ],
  services: [{ id: 1, quantity: 1 }],
};

describe("CartIconTop", () => {
  const renderComponent = (cart = mockCart) => {
    return render(
      <AppDataContext.Provider value={{ appColors: mockAppColors }}>
        <CartContext.Provider value={{ cart }}>
          <CartIconTop />
        </CartContext.Provider>
      </AppDataContext.Provider>
    );
  };

  it("renders correctly", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("cart-icon")).toBeTruthy();
  });

  it("displays the correct total cart items", () => {
    const { getByText } = renderComponent();
    expect(getByText("4")).toBeTruthy();
  });

  it("does not display cart amount when cart is empty", () => {
    const { queryByTestId } = renderComponent({ products: [], services: [] });
    expect(queryByTestId("cart-amount")).toBeNull();
  });

  it("navigates to cart page on press", () => {
    const { getByTestId } = renderComponent();
    fireEvent.press(getByTestId("cart-icon"));
    expect(router.push).toHaveBeenCalledWith("/cart");
  });

  it("applies the correct style to the cart icon", () => {
    const { getByTestId } = renderComponent();
    const cartIcon = getByTestId("cart-icon");
    expect(cartIcon.props.style).toEqual(
      expect.objectContaining({
        tintColor: mockAppColors.primary,
      })
    );
  });
});
