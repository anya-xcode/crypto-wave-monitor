
export const formatNumber = (num: number, decimals = 2): string => {
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(decimals)}B`;
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(decimals)}M`;
  }
  if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(decimals)}K`;
  }
  return `$${num.toFixed(decimals)}`;
};

export const formatSupply = (num: number): string => {
  return new Intl.NumberFormat().format(Math.round(num));
};

export const formatPrice = (price: number): string => {
  if (price < 1) return price.toFixed(4);
  if (price < 10) return price.toFixed(3);
  if (price < 100) return price.toFixed(2);
  return price.toFixed(2);
};

export const formatPercent = (percent: number): string => {
  return percent.toFixed(2);
};
