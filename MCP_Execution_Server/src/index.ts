import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import { z } from "zod";
import { RedstoneService } from "./redstone.service.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const app = express();

// Initialize Redstone service
const redstoneService = new RedstoneService(
  process.env.RPC_URL || "https://mainnet.base.org",
  (process.env.REDSTONE_CONTRACT_ADDRESS || "0xf2ABAC32F9a440756Af99ed443B66f4371e532C8") as `0x${string}`
);

const server = new McpServer({
  name: "example-server",
  version: "1.0.0"
},
//  {
//   capabilities: {
//     "get-price": {
//       handler: async ({ pair }: { pair: string }) => {
//         try {
//           const price = await redstoneService.getPrice(pair);
//           return { price };
//         } catch (error) {
//           console.error("Error getting price:", error);
//           throw new Error(`Failed to get price for ${pair}`);
//         }
//       }
//     }
//   }
// }
);

server.tool(
	"get-price",
	{
	  pair: z.string().describe("Token pair to fetch price for"),
	},
	async ({ pair }) => {
	  try {
		const price = await redstoneService.getPrice(pair);
		return { content: [{ type: "text", text: `Price of ${pair}: ${price}` }] };
	  } catch (e) {
		throw new Error(`Failed to fetch price for ${pair}`);
	  }
	}
  );

let transport: SSEServerTransport | null = null;

app.get("/sse", (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  server.connect(transport);
});

app.post("/messages", (req, res) => {
  if (transport) {
    transport.handlePostMessage(req, res);
  }
});

app.listen(3000);