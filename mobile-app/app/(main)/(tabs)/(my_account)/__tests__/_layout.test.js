import { AppDataContext } from "@/context/AppDataContext";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import Layout from "../_layout";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

// Mock the dependencies
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
  Stack: ({ children, screenOptions }) => <>{screenOptions.headerRight()}</>,
}));

jest.mock("@/components/Buttons/IconButton", () => "MockIconButton");

const mockAppData = {
  appColors: { primary: "#000000" },
};

describe("Layout Component", () => {
  const renderComponent = () => {
    return render(
      <AppDataContext.Provider value={mockAppData}>
        <Layout />
      </AppDataContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("search-button")).toBeTruthy();
  });

  it("applies correct styles to the IconButton", () => {
    const { getByTestId } = renderComponent();
    const iconButton = getByTestId("search-button");

    expect(iconButton.props.ContainerStyling).toEqual({
      backgroundColor: `${mockAppData.appColors.primary}10`,
      paddingHorizontal: 10,
      marginBottom: 10,
    });
  });

  it("navigates to search screen when search button is pressed", () => {
    const { getByTestId } = renderComponent();
    const searchButton = getByTestId("search-button");

    fireEvent.press(searchButton);

    expect(router.push).toHaveBeenCalledWith("/(main)/search");
  });

  it("applies correct tint color to the search icon", () => {
    const { getByTestId } = renderComponent();
    const iconButton = getByTestId("search-button");

    expect(iconButton.props.icon.props.style).toEqual({
      tintColor: mockAppData.appColors.primary,
    });
  });
});
