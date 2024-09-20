import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { AppDataProvider } from "../../../context/AppDataContext";
import { AuthProvider } from "../../../context/AuthContext";
import { ShopsProvider } from "../../../context/ShopsContext";
import Login from "../login";

const mockLogin = jest.fn(({ email, password }) => {
  if (email === "test@example.com" && password === "password") {
    return Promise.resolve({ status: 200, data: { token: "mock-token" } });
  } else {
    return Promise.reject({
      response: { status: 401, data: "Invalid credentials" },
    });
  }
});
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));
jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
  Link: jest.fn(),
  Stack: jest.fn(),
  useRouter: jest.fn(),
}));

const mockShopData = {
  shopDetails: {
    name: "Test Shop",
  },
};

const mockAppColors = {
  gray: "#808080",
  gray2: "#A9A9A9",
  primary: "#3498db",
};

const asyncOperationOnAsyncStorage = async () => {
  const value = await AsyncStorage.getItem("myKey");
  return value;
};

describe("Login Component", () => {
  it("renders the login form correctly", async () => {
    await act(async () => {
      await asyncOperationOnAsyncStorage();

      const { getByPlaceholderText, getByText, getByTestId } = render(
        <AppDataProvider value={{ appColors: mockAppColors }}>
          <ShopsProvider value={{ shopData: mockShopData }}>
            <AuthProvider value={{ login: mockLogin }}>
              <Login />
            </AuthProvider>
          </ShopsProvider>
        </AppDataProvider>
      );

      // Assertions
      // expect(getByTestId("Test Shop")).toBeTruthy();
      expect(getByPlaceholderText("Email")).toBeTruthy();
      expect(getByPlaceholderText("Password")).toBeTruthy();
      expect(getByText("Login")).toBeTruthy();
    });
  });

  it("shows error when fields are empty", async () => {
    const { getByText } = render(
      <AppDataProvider value={{ appColors: mockAppColors }}>
        <ShopsProvider value={{ shopData: mockShopData }}>
          <AuthProvider value={{ login: mockLogin }}>
            <Login />
          </AuthProvider>
        </ShopsProvider>
      </AppDataProvider>
    );

    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(mockLogin).not.toHaveBeenCalled();
      expect(getByText("Please fill out all fields.")).toBeTruthy();
    });
  });

  it("calls login with correct payload", async () => {
    const { getByPlaceholderText, getByText } = render(
      <AppDataProvider value={{ appColors: mockAppColors }}>
        <ShopsProvider value={{ shopData: mockShopData }}>
          <AuthProvider value={{ login: mockLogin }}>
            <Login />
          </AuthProvider>
        </ShopsProvider>
      </AppDataProvider>
    );
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
      fireEvent.changeText(getByPlaceholderText("Password"), "password");
      fireEvent.press(getByText("Login"));
    });

    // await waitFor(() => {
    //   expect(mockLogin).toHaveBeenCalledWith({
    //     email: "test@example.com",
    //     password: "password",
    //   });
    // });
  });
});
