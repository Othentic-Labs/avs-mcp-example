import { z } from "zod";
import { AVSService } from "../services/avs.service.js";
import { IpfsService } from "../services/ipfs.service.js";

/**
 * Registers the send-task tool with the MCP server
 * @param {McpServer} server - MCP server instance
 * @param {IpfsService} ipfsService - IPFS service
 * @param {AVSService} avsService - AVS service
 */
export function registerTaskTool(server: any, ipfsService: IpfsService, avsService: AVSService) {
  server.tool(
    "send-task",
    "Send Task for validation to the AVS network",
    {
      price: z.string().describe("proof of task"),
      data: z.string().describe("additional data"),
    },
    async ({ price, data }: {price: any, data: any}) => {
      try {
        const result = { price: parseFloat(price) };
        const proofOfTask = await ipfsService.publishJSON(result);
        await avsService.sendTask(proofOfTask, data, 0);

        return {
          content: [
            {
              type: "text",
              text: `Sent successfully`,
            },
          ],
        };
      } catch (error) {
        console.error("Error in send-task tool:", error);
        return {
          content: [
            {
              type: "text",
              text: "Failed to submit Task",
            },
          ],
        };
      }
    }
  );
}