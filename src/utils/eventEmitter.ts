import { EventEmitter } from "events";

export class AppEventEmitter {
  private emitter = new EventEmitter();

  public on<E extends Event>(event: E, listener: Listener<E>) {
    this.emitter.on(event, listener);
  }

  public once<E extends Event>(event: E, listener: Listener<E>) {
    this.emitter.once(event, listener);
  }

  public emit<E extends Event>(event: E, payload: Payload<E>) {
    this.emitter.emit(event, payload);
  }
}

const EVENTS = {
  APPLICATION_START: "applicationStart",
  APPLICATION_SHUTDOWN: "applicationShutdown",
} as const;

type EVENTS = typeof EVENTS;

type Event = EVENTS[keyof EVENTS];

// prettier-ignore
type Payload<E extends Event> =
    E extends EVENTS['APPLICATION_START'] ? undefined
  : E extends EVENTS['APPLICATION_START'] ? undefined
  : never

type Listener<E extends Event> = (payload: Payload<E>) => void | Promise<void>;
