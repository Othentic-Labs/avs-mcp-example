import { asyncHandler } from "../utils/error.util.js";

/**
 * Service for fetching price data from Binance
 */
export class PriceService {
  headers: { "User-Agent": any; Accept: string; };
  endpoint: any;
  constructor(userAgent: any, endpoint: any) {
    this.headers = {
      "User-Agent": userAgent,
      "Accept": "application/json"
    };
    this.endpoint = endpoint;
  }

  /**
   * Gets current price for a currency pair from Binance
   * @param {string} pair - Currency pair (e.g., "ETHUSDT")
   * @returns {Promise<string>} - Current price
   */
  async getPrice(pair: any) {
    return asyncHandler(
      async () => {
        const response = await fetch(
          `${this.endpoint}?symbol=${pair}`,
          { headers: this.headers }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return (await response.json()).price;
      },
      "Error fetching price data"
    );
  }
}