const CurrencyUtil = {
  toCurrency(value: string | number, options: Intl.NumberFormatOptions = {}) {
    const defaultOptions: Intl.NumberFormatOptions = {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      ...options,
    }

    return new Intl.NumberFormat('en-US', defaultOptions).format(Number(value))
  },
}

export default CurrencyUtil
