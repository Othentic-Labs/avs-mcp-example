import pinataSDK from "@pinata/sdk";
import { asyncHandler } from "../utils/error.util.js";

/**
 * Service for IPFS operations using Pinata
 */
export class IpfsService {
  pinata: any;
  constructor(apiKey: string, secretApiKey: string) {
    //@ts-ignore
    this.pinata = new pinataSDK(apiKey, secretApiKey);
  }

  /**
   * Publishes JSON data to IPFS via Pinata
   * @param {Object} data - JSON data to publish
   * @returns {Promise<string>} - IPFS hash of the published content
   */
  async publishJSON(data: any) {
    return asyncHandler(
      async () => {
        const response = await this.pinata.pinJSONToIPFS(data);
        return response.IpfsHash;
      },
      "Error publishing to IPFS"
    );
  }
}