import { runEventEmitterTests } from "./EventEmitter.test";

jest.mock("../EnvironmentDetector", () => "node");

runEventEmitterTests();
