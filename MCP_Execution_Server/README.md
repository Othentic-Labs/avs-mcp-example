# Remote AVS MCP Server

This example showcases How to run a remote AVS MCP Server. It fetches weETH/ETH data from the redstone AVS

## Usage: 

```bash
cd MCP_Execution_Server
npm i
npm run start
```

## Connect Claude Desktop to your AVS MCP server

You can also connect to your remote MCP server from local MCP clients, by using the [mcp-remote proxy](https://www.npmjs.com/package/mcp-remote). 

To connect to your MCP server from Claude Desktop, follow [Anthropic's Quickstart](https://modelcontextprotocol.io/quickstart/user) and within Claude Desktop go to Settings > Developer > Edit Config.

Update with this configuration:

```json
{
  "mcpServers": {
    "calculator": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:3000/sse"  
      ]
    }
  }
}
```

Restart Claude and you should see the tools become available. 

You can query following
```
get the price of weETH/ETH from redstone AVS

```

## Customizing your AVS MCP Server

To add your own AVS to the MCP server, define each tool inside the `init()` method of `src/index.ts` using `this.server.tool(...)`. 

## Connect to Cloudflare AI Playground

You can connect to your MCP server from the Cloudflare AI Playground, which is a remote MCP client:

1. Go to https://playground.ai.cloudflare.com/
2. Enter your deployed MCP server URL (`remote-mcp-server-authless.<your-account>.workers.dev/sse`)
3. You can now use your MCP tools directly from the playground!
