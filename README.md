# AVS MCP TEE Server

## Table of Contents

1. [Overview](#overview)
2. [Components](#components)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Next Steps](#next-steps)
6. [Disclaimer](#disclaimer)
## Overview

The AVS MCP server acts as an interface between the AI Agents and the AVS network, enabling you to read data validated by an AVS. The MCP server runs securely inside a Trusted Execution Environment (TEE) to ensure integrity and confidentiality.

![alt text](image.png)

### Key Features

- **Decentralized Verification:** Submit tasks to the AVS network for consensus-based verification

- **Verifiable Outputs:** Generate cryptographic proofs of AI-initiated tasks

- **On chain Validation:** Execute transaction on chain

- **Blockchain Data Access:** Query real-time blockchain data for informed AI decision-making


## Components
[MCP Server](https://modelcontextprotocol.io/quickstart/server) requires the development of custom tools. You can create tools for generating [Proof of Task](https://docs.othentic.xyz/main/avs-framework/othentic-consensus/proof-of-task) and sending it to the AVS network. Additionally, you can integrate external resources such as APIs, databases, and local storage.

### Tools  

- **get-price**: Fetches the price of a cryptocurrency pair from the Redstone AVS.  
  - **Input:**  
    - `pair` (string): The name of the cryptocurrency pair (e.g., `ETHUSDT`).   

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Othentic-Labs/avs-mcp-example.git
   cd avs-mcp-example
   git checkout read-avs-data
   ```

2. Install Othentic CLI:

   ```bash
   npm i -g @othentic/othentic-cli
   ```


## Usage
1. **Build the MCP server**

Run the following commands to compile the server:

```bash
cd MCP_Execution_Server
npm i
npm run build
```

2. **Configure Claude Desktop**
   
Add the configuration for the MCP Server in your `claude_desktop_config.json` file. Detailed instructions are available in the Claude Desktop [Configuration Guide](https://modelcontextprotocol.io/quickstart/user).

Replace `ADD_ABSOLUTE_PATH` and `YOUR_PERFORMER_PRIVATE_KEY_HERE` with the appropriate values:

```JSON
{
  "mcpServers": {
    "AVSPerformer": {
      "command": "node",
      "args":["ADD_ABSOLUTE_PATH/avs-mcp-example/MCP_Execution_Server/build/index.js"]
    }
  }
}
```

3. **Sample Prompts**
   
You can interact with the AVS MCP Server using prompts such as:

```bash
can you get the price of weETH/ETH using Redstone AVS?
```


## Next Steps
- Write an MCP server for your AVS
- Test it out and add it to the MCP Server repository.

### Use Cases

- **AI-Powered DeFi:** Trading agents that interface with intent solver AVS to bridge liquidity

- **Autonomous Agents:** Make decisions based on real-time indexed blockchain data

- **Workflow Automation:** Trigger and monitor on-chain actions across integrated applications

- **Oracle Integration:** Access verifiable data through oracle AVS networks

Happy Building! 🚀

## Disclaimer

This repository is an experimental implementation intended for testing and development purposes only. Do not use this in production environments without conducting a thorough security audit.

