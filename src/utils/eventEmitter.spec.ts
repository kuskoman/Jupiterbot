import { AppEventEmitter } from "./eventEmitter";

describe(AppEventEmitter.name, () => {
  it("should correctly emit and receive event", () => {
    const emitter = new AppEventEmitter();
    const event = "applicationStart";

    const functionCallSpy = jest.fn();

    emitter.on(event, () => {
      functionCallSpy();
    });
    emitter.emit(event, undefined);

    expect(functionCallSpy).toBeCalledTimes(1);
  });

  it("should call callback only once when once method is used", () => {
    const emitter = new AppEventEmitter();
    const event = "applicationStart";

    const functionCallSpy = jest.fn();

    emitter.once(event, () => {
      functionCallSpy();
    });
    emitter.emit(event, undefined);
    emitter.emit(event, undefined);

    expect(functionCallSpy).toBeCalledTimes(1);
  });
});
