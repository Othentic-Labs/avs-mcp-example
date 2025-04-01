import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  server: {
    name: "AVS MCP",
    version: "1.0.0"
  },
  network: {
    rpcBaseAddress: process.env.OTHENTIC_CLIENT_RPC_ADDRESS ?? "http://localhost:8545",
    privateKey: process.env.PRIVATE_KEY_PERFORMER ?? "0x"
  },
  pinata: {
    apiKey: process.env.PINATA_API_KEY ?? '7824585a98fe36414d68',
    secretApiKey: process.env.PINATA_SECRET_API_KEY ?? '41a53a837879721969e73008d91180df30dbc66097c7f75f08cd5489176b43ea'
  },
  api: {
    userAgent: "binance-app/1.0",
    binanceEndpoint: "https://api.binance.com/api/v3/ticker/price"
  }
};