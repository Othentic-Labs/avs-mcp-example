import { ethers } from 'ethers';
import { asyncHandler } from "../utils/error.util.js";
import { getSigningKey, sign } from "../utils/mcl.js";
/**
 * Service for AVS operations
 */
export class AVSService {
  rpcBaseAddress: string;
  privateKey: string;
  performerAddress: any;
  provider: ethers.JsonRpcProvider;

  constructor(rpcBaseAddress: string, privateKey: string, performerAddress: string) {
    this.rpcBaseAddress = rpcBaseAddress;
    this.privateKey = privateKey;
    this.performerAddress = performerAddress;
    this.provider = new ethers.JsonRpcProvider(rpcBaseAddress);
  }

  /**
   * Sends a task to the AVS network for validation
   * @param {string} proofOfTask - IPFS hash of the proof of task
   * @param {string} data - Additional data for the task
   * @param {number} taskDefinitionId - Task definition identifier
   * @returns {Promise<any>} - Response from the AVS network
   */
  async sendTask(proofOfTask: any, data: any, taskDefinitionId: any) {
    return asyncHandler(
      async () => {
        const encodedData = ethers.hexlify(ethers.toUtf8Bytes(data));
        
        const message = ethers.AbiCoder.defaultAbiCoder().encode(
          ["string", "bytes", "address", "uint16"],
          [proofOfTask, encodedData, this.performerAddress, taskDefinitionId]
        );
        
        const messageHash = ethers.keccak256(message);
        const signingKey = getSigningKey(this.privateKey);
        const sig = sign(signingKey, messageHash);
        const sigType = 'bls';

        return await this.provider.send("sendTask", [
          proofOfTask,
          encodedData,
          taskDefinitionId,
          this.performerAddress,
          sig,
          sigType
        ]);
      }, 
      "Error sending task to AVS Network"
    );
  }
}