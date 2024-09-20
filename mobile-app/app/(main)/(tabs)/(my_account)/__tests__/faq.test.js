import { AppDataContext } from "@/context/AppDataContext";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import FAQPage from "../faq"; // Adjust the import path as necessary

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe("FAQPage Component", () => {
  const mockAppColors = {
    primary: "#0000ff",
  };

  const mockContextValue = {
    appColors: mockAppColors,
  };

  it("should render FAQPage correctly", () => {
    const { getByText, getAllByText } = render(
      <AppDataContext.Provider value={mockContextValue}>
        <FAQPage />
      </AppDataContext.Provider>
    );

    // Check if the title is rendered
    expect(getByText("Frequently Asked Questions")).toBeTruthy();

    // Check if the questions are rendered
    expect(getByText("How do I reset my password?")).toBeTruthy();
    expect(getByText("Where can I view my order history?")).toBeTruthy();
    expect(getByText("How do I contact customer support?")).toBeTruthy();

    // Check if the initial icons are "+"
    expect(getAllByText("+")).toBeTruthy();
  });

  it("should toggle the FAQ answer on click", () => {
    const { getByText, queryByText } = render(
      <AppDataContext.Provider value={mockContextValue}>
        <FAQPage />
      </AppDataContext.Provider>
    );

    const firstQuestion = getByText("How do I reset my password?");
    const secondQuestion = getByText("Where can I view my order history?");

    // Initially, the answer should not be visible
    expect(
      queryByText(
        "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions to reset your password."
      )
    ).toBeNull();

    // Simulate pressing the first question
    fireEvent.press(firstQuestion);

    // After pressing, the answer should be visible
    expect(
      getByText(
        "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions to reset your password."
      )
    ).toBeTruthy();

    // The icon should change to "-"
    expect(getByText("-")).toBeTruthy();

    // Simulate pressing the second question
    fireEvent.press(secondQuestion);

    // The first answer should be hidden, and the second should be visible
    expect(
      queryByText(
        "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions to reset your password."
      )
    ).toBeNull();
    expect(
      getByText(
        "You can view your order history in the 'My Orders' section under your profile."
      )
    ).toBeTruthy();
  });
});
