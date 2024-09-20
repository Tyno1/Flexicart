import { AppDataContext } from "@/context/AppDataContext";
import { CartContext } from "@/context/CartContext";
import { render } from "@testing-library/react-native";
import React from "react";
import CartButton from "../CartButton";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

// Mock CartContext and AppDataContext
const mockCartContext = (cartData) => ({
  cart: cartData,
});

const mockAppDataContext = {
  appColors: { primary: "#000000" },
};

describe("CartButton", () => {
  it("should render the cart icon with the correct total number of items", () => {
    // Mock cart data with products and services
    const cartData = {
      products: [{ quantity: 2 }, { quantity: 1 }],
      services: [{ quantity: 1 }],
    };

    const { getByText } = render(
      <AppDataContext.Provider value={mockAppDataContext}>
        <CartContext.Provider value={mockCartContext(cartData)}>
          <CartButton color="#000000" />
        </CartContext.Provider>
      </AppDataContext.Provider>
    );

    expect(getByText("4")).toBeTruthy();
  });

  it("should show 0 if the cart is empty", () => {
    const emptyCart = {
      products: [],
      services: [],
    };

    const { getByText } = render(
      <AppDataContext.Provider value={mockAppDataContext}>
        <CartContext.Provider value={mockCartContext(emptyCart)}>
          <CartButton color="#000000" />
        </CartContext.Provider>
      </AppDataContext.Provider>
    );

    // Assert that the cart icon displays 0 when no items are in the cart
    expect(getByText("0")).toBeTruthy();
  });

  it("should render the cart icon with correct background color", () => {
    const { getByTestId } = render(
      <AppDataContext.Provider value={mockAppDataContext}>
        <CartContext.Provider
          value={mockCartContext({ products: [], services: [] })}
        >
          <CartButton color="#FF0000" />
        </CartContext.Provider>
      </AppDataContext.Provider>
    );

    const cartIcon = getByTestId("cart-icon");
    expect(cartIcon.props.style.backgroundColor).toBe("#FF0000");
  });
});
