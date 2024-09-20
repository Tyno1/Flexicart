
export const currencyConverter = (value: string) => {
  switch (value) {
    case "usd":
      return <span>&#36;</span>;
    case "eur":
      return <span>&#x20AC;</span>;
    case "gbp":
      return <span>&#163;</span>;
    default:
      return value;
  }
};
