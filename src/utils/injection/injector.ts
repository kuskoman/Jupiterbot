import { Constructor } from "../../types";
import "reflect-metadata";

const PARAMS_REFLECT_KEY = "design:paramtypes";

export class Injector {
  resolve<T>(Target: Constructor<T>): T {
    const params: unknown[] = Reflect.getMetadata(PARAMS_REFLECT_KEY, Target) || [];
    const resolvedParams = params.map((param) => this.resolve(param as Constructor<unknown>));

    return new Target(...resolvedParams);
  }
}
