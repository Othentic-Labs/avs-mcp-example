import { config } from "./config.js";
import { IpfsService } from "./services/ipfs.service.js";
import { AVSService } from "./services/avs.service.js";
import { PriceService } from "./services/price.service.js";
import { AvsMCPServer } from "./server/mcp.server.js";

/**
 * Main application entry point
 */
async function main() {
  try {
    // Initialize services
    const services = {
      ipfs: new IpfsService(
        config.pinata.apiKey,
        config.pinata.secretApiKey
      ),
      
      avs: new AVSService(
        config.network.rpcBaseAddress,
        config.network.privateKey
      ),
      
      price: new PriceService(
        config.api.userAgent,
        config.api.binanceEndpoint
      )
    };

    // Create and start server
    const avsServer = new AvsMCPServer(config, services);
    await avsServer.start();
    
  } catch (error) {
    console.error("Fatal error in main():", error);
    process.exit(1);
  }
}

// Run the application
main();