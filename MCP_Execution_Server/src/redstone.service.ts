import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import { asyncHandler } from './error.util.js';


const redstoneAbi = [
  {
    inputs: [],
    name: "price",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class RedstoneService {
  client: any;
  contractAddress: `0x${string}`;
  constructor(
    rpcUrl: string,
    contractAddress: `0x${string}`
  ) {
    this.client = createPublicClient({
      chain: base,
      transport: http(),
    });

    this.contractAddress = contractAddress;
  }

  /** 
   * Gets current price for a token from the Redstone contract
   * @param {string} token - Token symbol (e.g., "ETH")
   * @returns {Promise<string>} - Current price as string
   */
  async getPrice(token: string): Promise<string> {
    return asyncHandler(
      async () => {
        const result = await this.client.readContract({
          address: this.contractAddress,
          abi: redstoneAbi,
          functionName: 'price',
        });
        const price = Number(result) / 1e8;

        return price.toString();
      },
      `Error fetching price for ${token}`
    );
  }
}
