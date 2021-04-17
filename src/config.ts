import "dotenv/config";

const config = {
  token: process.env.DISCORD_TOKEN,
  prefix: process.env.prefix || "$",
  logLevel: process.env.LOG_LEVEL || "info",
};

export default config;
