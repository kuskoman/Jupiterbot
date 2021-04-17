import { Constructor } from "../../types";

const PARAMS_REFLECT_KEY = "design:paramtypes";

export class Injector {
  resolve<T>(Target: Constructor<T>): T {
    const params: unknown[] = Reflect.getMetadata(PARAMS_REFLECT_KEY, Target) || [];
    const resolvedParams = params.map((param) => this.resolve(param as Constructor));

    return new Target(...resolvedParams);
  }
}
