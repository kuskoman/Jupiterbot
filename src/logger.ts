import winston, { createLogger, transports } from "winston";
import config from "./config";

export const logger = createLogger({
  level: config.logLevel,
  format: winston.format.cli(),
  transports: [new transports.Console()],
});

export type Logger = typeof logger;
