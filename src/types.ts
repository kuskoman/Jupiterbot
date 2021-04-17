export interface Logger {
  info: (msg: string) => unknown;
  debug: (msg: string) => unknown;
  http: (msg: string) => unknown;
  warn: (msg: string) => unknown;
  error: (msg: string) => unknown;
}

export interface Constructor<T = unknown> {
  new (...args: unknown[]): T;
}

export type TypedClassDecorator<T> = (target: Constructor<T>) => T | void;
