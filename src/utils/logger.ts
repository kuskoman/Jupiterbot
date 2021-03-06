import winston, { createLogger, transports } from "winston";
import config from "../config";
import { Logger as TLogger, LogLevel } from "../types";
import { Color } from "colors";

export class Logger implements TLogger {
  private static logger: TLogger = createLogger({
    level: config.logLevel,
    format: winston.format.cli(),
    transports: [new transports.Console()],
  });

  constructor(private readonly name: string, private readonly defaultCtx?: string) {}

  public info(msg: any, ctx?: any) {
    return this.log("info", this.name, msg, "white", ctx);
  }

  public debug(msg: any, ctx?: any) {
    return this.log("debug", this.name, msg, "magenta", ctx);
  }

  public warn(msg: any, ctx?: any) {
    return this.log("warn", this.name, msg, "yellow", ctx);
  }

  public error(msg: any, ctx?: any) {
    return this.log("error", this.name, msg, "red", ctx);
  }

  public http(msg: any, ctx?: any) {
    return this.log("http", this.name, msg, "blue", ctx);
  }

  private log(type: LogLevel, loggerName: string, msg: any, color: AvaiableColor, ctx?: any) {
    const ctxString = this.parseContext(ctx);
    const logString = `[${loggerName}]${ctxString} ${msg}`[color];
    Logger.logger[type](logString);
  }

  private parseContext(ctx?: any) {
    const context = ctx || this.defaultCtx;
    const ctxString = context ? ` [${context}]` : "";

    return ctxString;
  }
}

type AvaiableColorHelper = {
  [K in keyof Color]: Color[K] extends Color ? K : never;
};
type AvaiableColor = Exclude<AvaiableColorHelper[keyof AvaiableColorHelper], "bold">;
