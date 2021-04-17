export interface Logger {
  info: (msg: string) => unknown;
  debug: (msg: string) => unknown;
  http: (msg: string) => unknown;
  warn: (msg: string) => unknown;
  error: (msg: string) => unknown;
}

export interface Constructor<T> {
  new (...args: any[]): T;
}

export type TypedClassDecorator<T extends Function> = (target: Constructor<T>) => T | void;
