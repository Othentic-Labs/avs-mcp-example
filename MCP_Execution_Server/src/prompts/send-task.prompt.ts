/**
 * Registers the send-task prompt with the MCP server
 * @param {McpServer} server - MCP server instance
 */
export function registerSendTaskPrompt(server: any) {
    server.prompt("send-task", async (request: any) => {
      const { pair = "ETHUSDT" } = request;
  
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Can you get the price of ${pair}?`
            }
          },
          {
            role: "assistant",
            content: {
              type: "text",
              text: `I'll get the current price of ${pair} for you.`
            }
          },
          {
            role: "tool",
            name: "get-price",
            input: { pair }
          },
          {
            role: "tool",
            name: "get-price",
            output: {
              content: {
                type: "text",
                text: "The current price of ETHUSDT is $2,092.50."
              }
            }
          },
          {
            role: "user",
            content: {
              type: "text",
              text: `Can you validate this price using the AVS network?`
            }
          },
          {
            role: "assistant",
            content: {
              type: "text",
              text: `I'll submit this price as proof of task for validation.`
            }
          },
          {
            role: "tool",
            name: "send-task",
            input: {
              price: "2,092.50",
              data: "Price validation request"
            }
          }
        ],
        _meta: {
          description: "Retrieves the ETHUSDT price and submits it for validation using the AVS network."
        }
      };
    });
  }