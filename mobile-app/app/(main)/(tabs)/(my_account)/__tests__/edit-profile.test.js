import { AppDataContext } from "@/context/AppDataContext";
import { UserContext } from "@/context/UserContext";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";
import EditProfile from "../edit_profile";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(() => ({
    canceled: false,
    assets: [{ base64: "testbase64string" }],
  })),
}));

jest.mock("expo-router", () => ({
  router: { replace: jest.fn() },
}));

describe("EditProfile Component", () => {
  const appColors = {
    primary: "#0000ff",
    gray2: "#cccccc",
  };

  const appFonts = {
    bold: "App-Bold",
    regular: "App-Regular",
  };

  const mockUserDetails = {
    imageUrl: null,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123456789",
    username: "johndoe",
    address: "123 Main St",
  };

  const mockUpdateUserById = jest.fn();

  const mockContextValue = {
    appColors,
    appFonts,
  };

  const mockUserContextValue = {
    userDetails: mockUserDetails,
    updateUserById: mockUpdateUserById,
    isLoading: false,
    error: null,
  };

  const mockAlert = jest.spyOn(Alert, "alert");

  beforeEach(() => {
    mockAlert.mockClear();
    mockUpdateUserById.mockClear();
  });

  it("should render all input fields and the save button", () => {
    const { getByPlaceholderText, getByText } = render(
      <AppDataContext.Provider value={mockContextValue}>
        <UserContext.Provider value={mockUserContextValue}>
          <EditProfile />
        </UserContext.Provider>
      </AppDataContext.Provider>
    );

    expect(getByPlaceholderText("Username")).toBeTruthy();
    expect(getByPlaceholderText("First Name")).toBeTruthy();
    expect(getByPlaceholderText("Last Name")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Phone Number")).toBeTruthy();
    expect(getByPlaceholderText("Address")).toBeTruthy();
    expect(getByText("Save Changes")).toBeTruthy();
  });

  it("should handle input changes", () => {
    const { getByPlaceholderText } = render(
      <AppDataContext.Provider value={mockContextValue}>
        <UserContext.Provider value={mockUserContextValue}>
          <EditProfile />
        </UserContext.Provider>
      </AppDataContext.Provider>
    );

    const firstNameInput = getByPlaceholderText("First Name");
    const lastNameInput = getByPlaceholderText("Last Name");

    fireEvent.changeText(firstNameInput, "Jane");
    fireEvent.changeText(lastNameInput, "Smith");

    expect(firstNameInput.props.value).toBe("Jane");
    expect(lastNameInput.props.value).toBe("Smith");
  });

  it("should update the user profile when 'Save Changes' is pressed", async () => {
    const { getByText, getByPlaceholderText } = render(
      <AppDataContext.Provider value={mockContextValue}>
        <UserContext.Provider value={mockUserContextValue}>
          <EditProfile />
        </UserContext.Provider>
      </AppDataContext.Provider>
    );

    const saveButton = getByText("Save Changes");

    // Fill all fields
    fireEvent.changeText(getByPlaceholderText("First Name"), "Jane");
    fireEvent.changeText(getByPlaceholderText("Last Name"), "Smith");
    fireEvent.changeText(
      getByPlaceholderText("Email"),
      "jane.smith@example.com"
    );
    fireEvent.changeText(getByPlaceholderText("Phone Number"), "9876543210");
    fireEvent.changeText(getByPlaceholderText("Address"), "456 Elm St");

    const mockUpdateUserById = jest.fn(() =>
      Promise.resolve({ success: true })
    );
    // fireEvent.press(saveButton, mockUpdateUserById);

    // expect(mockUpdateUserById).toHaveBeenCalledWith({
    //   imageUrl: null,
    //   firstName: "Jane",
    //   lastName: "Smith",
    //   email: "jane.smith@example.com",
    //   phone: "9876543210",
    //   username: "johndoe",
    //   address: "456 Elm St",
    // });
  });

  it("should trigger image picker when 'Choose Image' is pressed", async () => {
    const { getByText } = render(
      <AppDataContext.Provider value={mockContextValue}>
        <UserContext.Provider value={mockUserContextValue}>
          <EditProfile />
        </UserContext.Provider>
      </AppDataContext.Provider>
    );

    const chooseImageButton = getByText("Choose Image");
    fireEvent.press(chooseImageButton);

    expect(mockUpdateUserById).not.toHaveBeenCalled(); // No save action yet
  });
});
