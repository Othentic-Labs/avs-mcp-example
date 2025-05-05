import { z } from "zod";
import { RedstoneService } from "../services/redstone.service.js";

/**
 * Registers the price tool with the MCP server
 * @param {McpServer} server - MCP server instance
 * @param {RedstoneService} redstoneService - Redstone service
 */
export function registerRedstoneGetPriceTool(server: any, redstoneService: RedstoneService) {
  server.tool(
    "get-price",
    "Get price data for a currency pair",
    {
      pair: z.string().describe("Pair to query price data"),
    },
    async ({ pair }: { pair: string }) => {
      try {
        const price = await redstoneService.getPrice(pair);
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