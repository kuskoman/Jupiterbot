import { Injectable } from "./decorators/injectable";
import { Injector } from "./injector";

describe(Injector.name, () => {
  it("properly resolves dependencies of a class constructor", () => {
    const injector = new Injector();

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

  it("should treat dependencies as singletons", () => {
    const injector = new Injector();
    const counter = jest.fn();

    class A {
      constructor() {
        counter(A.name);
      }
    }

    @Injectable()
    class B {
      constructor(public readonly a: A) {}
    }

    @Injectable()
    class C {
      constructor(public readonly a: A) {}
    }

    const bInstance = injector.resolve(B);
    const cInstance = injector.resolve(C);

    expect(bInstance.a).toBeInstanceOf(A);
    expect(cInstance.a).toBeInstanceOf(A);

    expect(counter).toBeCalledTimes(1);
  });
});
