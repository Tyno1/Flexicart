import { ShopsContext } from "@/context/ShopsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import StoreSelect from "../index";

// Mock the dependencies
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
  Stack: {
    Screen: () => null,
  },
}));

const mockShops = [
  { _id: "1", shopUI: "shop1", shopDetails: { name: "Shop 1" } },
  { _id: "2", shopUI: "shop2", shopDetails: { name: "Shop 2" } },
];

describe("StoreSelect Component", () => {
  const renderComponent = (contextValue = {}) => {
    const defaultContext = {
      shops: mockShops,
      selectedShopUi: "",
      setSelectedShopUi: jest.fn(),
      setSelectedShop: jest.fn(),
      savedShopId: null,
    };

    return render(
      <ShopsContext.Provider value={{ ...defaultContext, ...contextValue }}>
        <StoreSelect />
      </ShopsContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with shops", () => {
    const { getByText, getByTestId } = renderComponent();
    expect(getByText("Select a Shop:")).toBeTruthy();
    expect(getByTestId("shop-picker")).toBeTruthy();
  });

  // it("displays correct number of shops in picker", () => {
  //   const { getAllByTestId } = renderComponent();
  //   const shopItems = getAllByTestId(/Shop \d/);
  //   expect(shopItems).toHaveLength(mockShops.length);
  // });

  it("calls handleShopSelect when a shop is selected", async () => {
    const setSelectedShopUi = jest.fn();
    const setSelectedShop = jest.fn();
    const { getByTestId } = renderComponent({
      setSelectedShopUi,
      setSelectedShop,
    });

    await act(async () => {
      fireEvent(getByTestId("shop-picker"), "onValueChange", "shop1");
    });

    expect(setSelectedShopUi).toHaveBeenCalledWith("shop1");
    expect(setSelectedShop).toHaveBeenCalledWith("1");
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
    expect(router.replace).toHaveBeenCalledWith("/splashScreen");
  });

  it("navigates to main tabs if savedShopId exists", () => {
    renderComponent({ savedShopId: "1" });
    expect(router.replace).toHaveBeenCalledWith("/(main)/(tabs)");
  });

  it("does not navigate if savedShopId is null", () => {
    renderComponent({ savedShopId: null });
    expect(router.replace).not.toHaveBeenCalled();
  });

  it("handles empty shops array", () => {
    const { queryByTestId } = renderComponent({ shops: [] });
    expect(queryByTestId("shop-picker")).toBeTruthy();
    expect(queryByTestId("Shop 1")).toBeNull();
  });
});
