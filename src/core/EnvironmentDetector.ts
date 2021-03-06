import { ERRORS } from "./ERRORS";

//eslint-disable-next-line no-new-func
const isBrowser = new Function(
  "try {return this===window;}catch(e){ return false;}"
);

//eslint-disable-next-line no-new-func
const isNode = new Function(
  "try {return this===global;}catch(e){return false;}"
);

export const currentEnvironment = (() => {
  if (isBrowser()) {
    return "browser";
  }
  if (isNode()) {
    return "node";
  }
  throw ERRORS.ENVIRONEMTN_UNKNOWN;
})();
