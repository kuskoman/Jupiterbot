export type Logger = {
  [K in LogLevel]: LogFunction;
};

export type LogLevel = "info" | "debug" | "http" | "warn" | "error";

export type LogFunction = (msg: string, ctx?: string) => unknown;

export interface Constructor<T> {
  new (...args: any[]): T;
}

export type TypedClassDecorator<T extends Function> = (target: Constructor<T>) => T | void;
