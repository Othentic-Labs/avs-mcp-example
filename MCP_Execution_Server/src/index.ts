import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { RedstoneService } from "./redstone.service";

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "Authless Calculator",
		version: "1.0.0",
	});

	async init() {
		let redstoneService = new RedstoneService(
			"",
			"0xf2ABAC32F9a440756Af99ed443B66f4371e532C8"
		  )

		// Redstone AVS tool with validated price data
		this.server.tool(
			"get-price",
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
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			// @ts-ignore
			return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
		}

		if (url.pathname === "/mcp") {
			// @ts-ignore
			return MyMCP.serve("/mcp").fetch(request, env, ctx);
		}

		return new Response("Not found", { status: 404 });
	},
};
