import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import FAB from "../Fab";

describe("FAB Component", () => {
  const defaultProps = {
    title: "Test FAB",
    onPress: jest.fn(),
  };

  it("renders correctly with default props", () => {
    const { getByText } = render(<FAB {...defaultProps} />);
    expect(getByText("Test FAB")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const { getByText } = render(<FAB {...defaultProps} />);
    fireEvent.press(getByText("Test FAB"));
    expect(defaultProps.onPress).toHaveBeenCalledTimes(1);
  });

  // it("applies custom container style", () => {
  //   const customStyle = { backgroundColor: "red" };
  //   const { getByText } = render(
  //     <FAB {...defaultProps} containerStyle={customStyle} />
  //   );
  //   const fabElement = getByText("Test FAB").parent;
  //   expect(fabElement.props.style).toEqual(
  //     expect.objectContaining(customStyle)
  //   );
  // });

  // it("applies custom text style", () => {
  //   const customTextStyle = { color: "green", fontSize: 20 };
  //   const { getByText } = render(
  //     <FAB {...defaultProps} textStyle={customTextStyle} />
  //   );
  //   const textElement = getByText("Test FAB");
  //   expect(textElement.props.style).toEqual(
  //     expect.arrayContaining([expect.objectContaining(customTextStyle)])
  //   );
  // });

  // it("renders icon when provided", () => {
  //   const iconTestId = "test-icon";
  //   const icon = <Text testID={iconTestId}>Icon</Text>;
  //   const { getByTestId } = render(<FAB {...defaultProps} icon={icon} />);
  //   expect(getByTestId(iconTestId)).toBeTruthy();
  // });

  it("renders without icon when not provided", () => {
    const { queryByTestId } = render(<FAB {...defaultProps} />);
    expect(queryByTestId("test-icon")).toBeNull();
  });
});
