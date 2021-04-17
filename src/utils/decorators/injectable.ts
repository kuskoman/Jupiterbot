import { TypedClassDecorator } from "../../types";

export const Injectable = <T>(): TypedClassDecorator<T> => {
  return (_target) => {};
};
