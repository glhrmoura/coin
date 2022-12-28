export default {
  toCurrency(value, options = {}) {
    const defaultOptions = {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      ...options,
    };

    return new Intl.NumberFormat('en-US', defaultOptions).format(value)
  },
};
