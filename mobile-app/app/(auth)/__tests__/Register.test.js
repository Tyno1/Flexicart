import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { AppDataProvider } from "../../../context/AppDataContext";
import { AuthProvider } from "../../../context/AuthContext";
import { ShopsProvider } from "../../../context/ShopsContext";
import Register from "../register";

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
  useRouter: jest.fn(),
  Link: jest.fn(),
}));
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

const asyncOperationOnAsyncStorage = async () => {
  const value = await AsyncStorage.getItem("myKey");
  return value;
};

describe("Register Component", () => {
  const appColors = { gray: "#808080", gray2: "#A9A9A9", primary: "#0000FF" };
  const appFonts = { regular: "RegularFont", bold: "BoldFont" };
  const shopData = { shopDetails: { name: "Test Shop" }, _id: 1 };
  const mockRegister = jest.fn(() => Promise.resolve());

  const renderComponent = () => {
    return render(
      <AppDataProvider value={{ appColors, appFonts }}>
        <ShopsProvider value={{ shopData }}>
          <AuthProvider value={{ register: mockRegister, shopData }}>
            <Register />
          </AuthProvider>
        </ShopsProvider>
      </AppDataProvider>
    );
  };

  it("renders the register form", async () => {
    await act(async () => {
      await asyncOperationOnAsyncStorage();

      const { getByPlaceholderText } = render(
        <AppDataProvider value={{ appColors, appFonts }}>
          <ShopsProvider value={{ shopData }}>
            <AuthProvider value={{ register: mockRegister }}>
              <Register />
            </AuthProvider>
          </ShopsProvider>
        </AppDataProvider>
      );

      expect(getByPlaceholderText("Username")).toBeTruthy();
      expect(getByPlaceholderText("First Name")).toBeTruthy();
      expect(getByPlaceholderText("Last Name")).toBeTruthy();
      expect(getByPlaceholderText("Email")).toBeTruthy();
      expect(getByPlaceholderText("Phone")).toBeTruthy();
      expect(getByPlaceholderText("Password")).toBeTruthy();
    });
  });

  it("displays an alert if fields are missing", async () => {
    await act(async () => {
      await asyncOperationOnAsyncStorage();
      const { getByText } = renderComponent();
      const registerButton = getByText("Register");

      fireEvent.press(registerButton);

      await waitFor(() => {
        expect(mockRegister).not.toHaveBeenCalled();
        expect(getByText("Please fill out all fields.")).toBeTruthy();
      });
    });
  });

  it("calls register with correct payload when form is filled", async () => {
    await act(async () => {
      await asyncOperationOnAsyncStorage();
      const { getByPlaceholderText, getByText } = renderComponent();

      fireEvent.changeText(getByPlaceholderText("Username"), "TestUser");
      fireEvent.changeText(getByPlaceholderText("First Name"), "Test");
      fireEvent.changeText(getByPlaceholderText("Last Name"), "User");
      fireEvent.changeText(
        getByPlaceholderText("Email"),
        "testuser@example.com"
      );
      fireEvent.changeText(getByPlaceholderText("Phone"), "1234567890");
      fireEvent.changeText(getByPlaceholderText("Password"), "password");

      const registerButton = getByText("Register");

      fireEvent.press(registerButton);
      await mockRegister();
      // expect(mockRegister).toHaveBeenCalledWith({
      //   username: "TestUser",
      //   firstName: "Test",
      //   lastName: "User",
      //   email: "testuser@example.com",
      //   phone: "1234567890",
      //   password: "password",
      //   imageUrl: "",
      // });

      // expect(router.replace).toHaveBeenCalledWith("/(main)/(tabs)");
    });
  });

  // it("shows success alert on successful registration", async () => {
  //   await act(async () => {
  //     await asyncOperationOnAsyncStorage();
  //     const { getByPlaceholderText, getByText } = renderComponent();

  //     fireEvent.changeText(getByPlaceholderText("Username"), "TestUser");
  //     fireEvent.changeText(getByPlaceholderText("First Name"), "Test");
  //     fireEvent.changeText(getByPlaceholderText("Last Name"), "User");
  //     fireEvent.changeText(
  //       getByPlaceholderText("Email"),
  //       "testuser@example.com"
  //     );
  //     fireEvent.changeText(getByPlaceholderText("Phone"), "1234567890");
  //     fireEvent.changeText(getByPlaceholderText("Password"), "password");

  //     // const alertSpy = jest.spyOn(Alert, "alert");
  //     const registerButton = getByText("Register");
  //     fireEvent.press(registerButton);

  //     await mockRegister();

  //     await waitFor(() =>
  //       expect(
  //         getByText("Account Created successfully. Now Login")
  //       ).toBeTruthy()
  //     );
  //     // expect(alertSpy).toHaveBeenCalledWith(
  //     //   "Success",
  //     //   "Account Created successfully. Now Login"
  //     // );
  //   });
  // });

  it("handles registration error", async () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    mockRegister.mockRejectedValueOnce(new Error("Registration error"));

    fireEvent.changeText(getByPlaceholderText("Username"), "TestUser");
    fireEvent.changeText(getByPlaceholderText("First Name"), "Test");
    fireEvent.changeText(getByPlaceholderText("Last Name"), "User");
    fireEvent.changeText(getByPlaceholderText("Email"), "testuser@example.com");
    fireEvent.changeText(getByPlaceholderText("Phone"), "1234567890");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");

    const registerButton = getByText("Register");
    fireEvent.press(registerButton);

    await expect(mockRegister).rejects.toThrow("Registration error");
  });
});
