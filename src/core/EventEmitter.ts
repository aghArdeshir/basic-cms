import EventEmitter from "events";
import { ERRORS } from "./ERRORS";
import { EVENT } from "./EVENT";
import { currentEnvironment } from "./EnvironmentDetector";

const listenersMap = new Map<EventListener, EventListener>();

class EventEmitterForBrowser extends EventTarget {
  on(event: EVENT, listener: EventListener) {
    if (listenersMap.has(listener)) {
      throw ERRORS.LISTENER_ALREADY_ATTACHED;
    }

    function customListener(e: Event | CustomEvent) {
      if (e instanceof CustomEvent) {
        listener(e.detail);
      } else {
        throw ERRORS.EVENT_IS_NOT_CUSTOM_EVENT;
      }
    }

    listenersMap.set(listener, customListener);
    this.addEventListener(event, customListener);
  }
  emit(eventName: EVENT, payload: Object | null = null) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
  }
  off(event: EVENT, listener: EventListener) {
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
  on(event: EVENT, listener: EventListener) {
    if (listenersMap.has(listener)) {
      throw ERRORS.LISTENER_ALREADY_ATTACHED;
    }

    listenersMap.set(listener, listener);
    super.on(event, listener);
    return this;
  }

  off(event: EVENT, listener: EventListener) {
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
