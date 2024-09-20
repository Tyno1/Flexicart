import { AppDataContext } from "@/context/AppDataContext";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";
import ContactUs from "../contact_us";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe("ContactUs Component", () => {
  const appColors = {
    primary: "#0000ff",
    gray2: "#cccccc",
  };
  const mockContextValue = {
    appColors,
  };
  const mockAlert = jest.spyOn(Alert, "alert");

  beforeEach(() => {
    mockAlert.mockClear();
  });

  it("should render all input fields and the submit button", () => {
    const { getByPlaceholderText, getByText } = render(
      <AppDataContext.Provider value={mockContextValue}>
        <ContactUs />
      </AppDataContext.Provider>
    );

    expect(getByPlaceholderText("First Name")).toBeTruthy();
    expect(getByPlaceholderText("Last Name")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Phone Number")).toBeTruthy();
    expect(getByPlaceholderText("Message")).toBeTruthy();
    expect(getByText("Submit")).toBeTruthy();
  });

  it("should handle input changes", () => {
    const { getByPlaceholderText } = render(
      <AppDataContext.Provider value={mockContextValue}>
        <ContactUs />
      </AppDataContext.Provider>
    );

    const firstNameInput = getByPlaceholderText("First Name");
    const lastNameInput = getByPlaceholderText("Last Name");

    fireEvent.changeText(firstNameInput, "John");
    fireEvent.changeText(lastNameInput, "Doe");

    expect(firstNameInput.props.value).toBe("John");
    expect(lastNameInput.props.value).toBe("Doe");
  });

  it("should show an error alert if any field is missing", () => {
    const { getByText, getByPlaceholderText } = render(
      <AppDataContext.Provider value={mockContextValue}>
        <ContactUs />
      </AppDataContext.Provider>
    );

    const submitButton = getByText("Submit");
    const firstNameInput = getByPlaceholderText("First Name");
    const lastNameInput = getByPlaceholderText("Last Name");

    // Only fill in first name and last name to simulate missing fields
    fireEvent.changeText(firstNameInput, "John");
    fireEvent.changeText(lastNameInput, "Doe");

    fireEvent.press(submitButton);

    expect(mockAlert).toHaveBeenCalledWith(
      "Error",
      "Please fill out all fields."
    );
  });

  it("should submit the form and show success alert when all fields are filled", () => {
    const { getByText, getByPlaceholderText } = render(
      <AppDataContext.Provider value={mockContextValue}>
        <ContactUs />
      </AppDataContext.Provider>
    );

    const submitButton = getByText("Submit");

    // Fill all fields
    fireEvent.changeText(getByPlaceholderText("First Name"), "John");
    fireEvent.changeText(getByPlaceholderText("Last Name"), "Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "john.doe@example.com");
    fireEvent.changeText(getByPlaceholderText("Phone Number"), "1234567890");
    fireEvent.changeText(getByPlaceholderText("Message"), "Hello!");

    fireEvent.press(submitButton);

    expect(mockAlert).toHaveBeenCalledWith(
      "Success",
      "Your message has been sent."
    );
  });
});
