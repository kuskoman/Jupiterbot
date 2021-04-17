import winston, { createLogger, transports } from "winston";
import config from "../config";
import { Logger } from "../types";

export const logger: Logger = createLogger({
  level: config.logLevel,
  format: winston.format.cli(),
  transports: [new transports.Console()],
});
