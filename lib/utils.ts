export function getHeight(index: number, tall: number, short: number) {
  const position = index % 4;
  return position === 0 || position === 3 ? tall : short;
}

export const formatCurrency = (value: number, currency = "USD"): string => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return value.toFixed(2);
  }
};