import KeyProcessor, { notHandled } from "../KeyProcessor";

const QuitProcessor: KeyProcessor = {
  handle({ ctrl, name }) {
    if (ctrl && name === "c") {
      process.exit(0);
    }
    return notHandled;
  }
};

export default QuitProcessor;
