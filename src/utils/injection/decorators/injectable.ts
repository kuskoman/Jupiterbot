import { TypedClassDecorator } from "../../../types";

export const Injectable = (): TypedClassDecorator<any> => {
  return (_target) => {};
};
