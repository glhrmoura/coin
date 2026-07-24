import type { QuotationPair } from './constants'

type QuotationResponse = {
  bid: string
}

const QuotationService = {
  async fetchLastQuotation({ from, to }: QuotationPair): Promise<QuotationResponse> {
    const reqURL = `https://economia.awesomeapi.com.br/json/last/${from}-${to}`
    const res = await fetch(reqURL)
    const data = await res.json()
    return data[`${from}${to}`]
  },
}

export default QuotationService
