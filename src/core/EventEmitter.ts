import EventEmitter from "events";
import { ERRORS } from "./ERRORS";
import { EVENT } from "./EVENT";
import { currentEnvironment } from "./EnvironmentDetector";

type BasicCmsEventListener<T> = (data: T) => void;
const listenersMap = new Map<
  BasicCmsEventListener<any>,
  BasicCmsEventListener<any>
>();

class EventEmitterForBrowser extends EventTarget {
  on<T>(event: EVENT, listener: BasicCmsEventListener<T>) {
    if (listenersMap.has(listener)) {
      throw ERRORS.LISTENER_ALREADY_ATTACHED;
    }

    function customListener(e: Event | CustomEvent) {
      listener((e as CustomEvent).detail);
    }

    listenersMap.set(listener, customListener);
    this.addEventListener(event, customListener);
  }
  emit(eventName: EVENT, payload: Object | null = null) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
  }
  off<T>(event: EVENT, listener: BasicCmsEventListener<T>) {
    if (!listenersMap.has(listener)) {
      throw ERRORS.LISTENER_NOT_ATTACHED;
    }

    const customListener = listenersMap.get(listener);

    if (customListener) {
      this.removeEventListener(event, customListener);
    }
  }
}

class EventEmitterForNode extends EventEmitter {
  on<T>(event: EVENT, listener: BasicCmsEventListener<T>) {
    if (listenersMap.has(listener)) {
      throw ERRORS.LISTENER_ALREADY_ATTACHED;
    }

    listenersMap.set(listener, listener);
    super.on(event, listener);
    return this;
  }

  off<T>(event: EVENT, listener: BasicCmsEventListener<T>) {
    if (!listenersMap.has(listener)) {
      throw ERRORS.LISTENER_NOT_ATTACHED;
    }

    listenersMap.delete(listener);
    super.off(event, listener);
    return this;
  }
}

export const core =
  currentEnvironment === "browser"
    ? new EventEmitterForBrowser()
    : new EventEmitterForNode();
