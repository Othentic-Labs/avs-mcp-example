import { z } from "zod";
import { PriceService } from "../services/price.service.js";

/**
 * Registers the price tool with the MCP server
 * @param {McpServer} server - MCP server instance
 * @param {PriceService} priceService - Price service
 */
export function registerPriceTool(server: any, priceService: PriceService) {
  server.tool(
    "get-price",
    "Get price data for a currency pair",
    {
      pair: z.string().describe("Pair to query price data"),
    },
    async ({ pair }: { pair: string }) => {
      try {
        const price = await priceService.getPrice(pair);
        return {
          content: [
            {
              type: "text",
              text: `Price of ${pair}: ${price}`,
            },
          ],
        };
      } catch (error) {
        console.error("Error in price tool:", error);
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve price data",
            },
          ],
        };
      }
    }
  );
}