import { ERRORS } from "../ERRORS";
import { EVENT } from "../EVENT";
import { core } from "../EventEmitter";

test("my event listener gets called", () => {
  const listener = jest.fn();
  core.on(EVENT.TEST_EVENT, listener);

  core.emit(EVENT.TEST_EVENT);

  expect(listener).toHaveBeenCalled();
});

test("after removing event listener, my listener should not be called", () => {
  const listener = jest.fn();
  core.on(EVENT.TEST_EVENT, listener);
  core.off(EVENT.TEST_EVENT, listener);

  core.emit(EVENT.TEST_EVENT);

  expect(listener).not.toHaveBeenCalled();
});

test("attaching same event listener twice to the same event must throw", () => {
  const listener = jest.fn();
  core.on(EVENT.TEST_EVENT, listener);

  expect(() => {
    core.on(EVENT.TEST_EVENT, listener);
  }).toThrow(ERRORS.LISTENER_ALREADY_ATTACHED);
});

test("removing an event listener that does not exists must throw an error", () => {
  const listener = jest.fn();

  expect(() => {
    core.off(EVENT.TEST_EVENT, listener);
  }).toThrow(ERRORS.LISTENER_NOT_ATTACHED);
});

test("my listener gets called with correct payload", () => {
  const testPayload = { test: "test" };
  const listener = jest.fn();
  core.on(EVENT.TEST_EVENT, listener);

  core.emit(EVENT.TEST_EVENT, testPayload);

  expect(listener).toHaveBeenCalledWith(testPayload);
});

test("my listener gets called as many times as required before removing it", () => {
  const listener = jest.fn();
  core.on(EVENT.TEST_EVENT, listener);

  core.emit(EVENT.TEST_EVENT);
  core.emit(EVENT.TEST_EVENT);
  core.off(EVENT.TEST_EVENT, listener);
  core.emit(EVENT.TEST_EVENT);

  expect(listener).toHaveBeenCalledTimes(2);
});
