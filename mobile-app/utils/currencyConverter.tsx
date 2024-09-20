import { Text } from "react-native";

export const currencyConverter = (value: string) => {
  switch (value) {
    case "usd":
      return <Text>&#36;</Text>;
    case "eur":
      return <Text>&#x20AC;</Text>;
    case "gbp":
      return <Text>&#163;</Text>;
    default:
      return value;
  }
};
