export const ERRORS = {
  ENVIRONEMTN_UNKNOWN: new Error(
    "Environment unknown: It is not browser nor node.js!"
  ),
  LISTENER_ALREADY_ATTACHED: new Error(
    "Listener already attached: Tried to attach the same listener twice!"
  ),
  LISTENER_NOT_ATTACHED: new Error(
    "Listener not attached: Tried to remove a listener that was not attached!"
  ),
  EVENT_IS_NOT_CUSTOM_EVENT: new Error(
    "EventEmitterForBrowser: Event is not CustomEvent!"
  ),
};
