import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerPriceTool } from "../tools/price.tool.js";
import { registerTaskTool } from "../tools/task.tool.js";
import { registerSendTaskPrompt } from "../prompts/send-task.prompt.js";

/**
 * Main AVS MCP server class
 */
export class AvsMCPServer {
    server: any;
    config: any;
    services: any;
  /**
   * @param {Object} config - Server configuration
   * @param {Object} services - Service instances
   * @param {Object} services.ipfs - IPFS service
   * @param {Object} services.avs - AVS service
   * @param {Object} services.price - Price service
   */
  constructor(config: any, services: any) {
    this.config = config;
    this.services = services;
    
    this.server = new McpServer(
      {
        name: config.server.name,
        version: config.server.version
      },
      {
        capabilities: {
          prompts: {}
        }
      }
    );

    this.initializeServer();
  }

  /**
   * Initialize server with prompts and tools
   */
  initializeServer() {
    // Register prompts
    registerSendTaskPrompt(this.server);
    
    // Register tools
    registerPriceTool(this.server, this.services.price);
    registerTaskTool(this.server, this.services.ipfs, this.services.avs);
  }

  /**
   * Start the server with the specified transport
   */
  async start() {
    try {
      const transport = new StdioServerTransport();
      await this.server.connect(transport);
    } catch (error) {
      console.error("Error starting server:", error);
      throw error;
    }
  }
}