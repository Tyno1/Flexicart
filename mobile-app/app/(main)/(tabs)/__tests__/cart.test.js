import { AppDataContext } from "@/context/AppDataContext";
import { CartContext } from "@/context/CartContext";
import { act, fireEvent, render } from "@testing-library/react-native";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import Cart from "../cart";

// Mock the dependencies
jest.mock("expo-web-browser", () => ({
  openBrowserAsync: jest.fn(),
}));
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

jest.mock("@/components/Buttons/Fab", () => "MockFAB");
jest.mock("@/components/Buttons/TextButton", () => "MockTextButton");
jest.mock("@/components/CartItem", () => "MockCartItem");

const mockAppData = {
  appColors: { primary: "#000000" },
  appFonts: { bold: "BoldFont", regular: "RegularFont" },
};

const mockCart = {
  products: [
    { productId: { _id: "p1", price: 10 }, quantity: 2 },
    { productId: { _id: "p2", price: 15 }, quantity: 1 },
  ],
  services: [{ serviceId: { _id: "s1", price: 20 }, quantity: 1 }],
};

const mockCartContext = {
  cart: mockCart,
  updateCart: jest.fn(),
  deleteCartItem: jest.fn(),
  checkout: jest.fn(),
};

describe("Cart Component", () => {
  const renderComponent = (cartContextValue = mockCartContext) => {
    return render(
      <AppDataContext.Provider value={mockAppData}>
        <CartContext.Provider value={cartContextValue}>
          <Cart />
        </CartContext.Provider>
      </AppDataContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = renderComponent();
    expect(getByText("Cart Summary")).toBeTruthy();
    expect(getByText("Products")).toBeTruthy();
    expect(getByText("Services")).toBeTruthy();
    expect(getByText("Charges")).toBeTruthy();
    expect(getByText("Total")).toBeTruthy();
  });

  it("calculates and displays correct totals", () => {
    const { getByText } = renderComponent();
    expect(getByText("£35.00")).toBeTruthy(); // Product total
    expect(getByText("£20.00")).toBeTruthy(); // Service total
    expect(getByText("£55.00")).toBeTruthy(); // Total
  });

  it("switches between Products and Services", async () => {
    const { getByText, getAllByText } = renderComponent();

    // Initially should show Products
    expect(getAllByText("Products")[0]).toBeTruthy();

    // Switch to Services
    await act(async () => {
      fireEvent.press(getByText("Services"));
    });

    // Now should show Services
    expect(getAllByText("Services")[0]).toBeTruthy();
  });

  it("calls checkout function when Checkout button is pressed", async () => {
    const { getByText, getByTestId } = renderComponent();

    mockCartContext.checkout.mockResolvedValue({
      data: { session: { url: "https://checkout.url" } },
    });

    await act(async () => {
      fireEvent.press(getByTestId("Checkout"));
    });

    expect(mockCartContext.checkout).toHaveBeenCalledWith(mockCart);
    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith(
      "https://checkout.url"
    );
  });

  it("handles empty cart", () => {
    const emptyCartContext = {
      ...mockCartContext,
      cart: { products: [], services: [] },
    };
    const { getAllByText } = renderComponent(emptyCartContext);

    expect(getAllByText("£0.00")).toBeTruthy(); // Product total
    expect(getAllByText("£0.00")).toBeTruthy(); // Service total
    expect(getAllByText("£0.00")).toBeTruthy(); // Total
  });
});
