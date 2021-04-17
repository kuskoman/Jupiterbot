import { Constructor } from "../../types";
import "reflect-metadata";

const PARAMS_REFLECT_KEY = "design:paramtypes";

export class Injector {
  /** stores already resolved class object, effectively making them singletons */
  private resolvedParams = new Map();

  /** resolves dependencies of given class. To make it working class must use Injectable decorator */
  resolve<T>(Target: Constructor<T>): T {
    const params: unknown[] = Reflect.getMetadata(PARAMS_REFLECT_KEY, Target) || [];
    const resolvedParams = params.map((param) => this.resolveParam(param as Constructor<unknown>));

    return new Target(...resolvedParams);
  }

  /** checks if param was already resolved, to avoid creating more than one instance of the class */
  private resolveParam<T>(param: Constructor<T>) {
    let resolvedParam = this.resolvedParams.get(param.name);

    if (resolvedParam) {
      return resolvedParam;
    }

    resolvedParam = this.resolve(param);
    this.resolvedParams.set(param.name, resolvedParam);

    return resolvedParam;
  }
}
