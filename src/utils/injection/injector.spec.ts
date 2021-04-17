import { Injectable } from "./decorators/injectable";
import { Injector } from "./injector";

describe(Injector.name, () => {
  it("properly resolves dependencies of a class constructor", () => {
    const injector = new Injector();

    @Injectable()
    class A {
      a() {
        return "a";
      }
    }

    @Injectable()
    class B {
      constructor(public readonly a: A) {}

      b() {
        return this.a.a();
      }
    }

    const bInstance = injector.resolve(B);

    expect(bInstance.a).toBeInstanceOf(A);
    expect(bInstance.b()).toBe("a");
  });
});
