import KeyProcessor, { notHandled, handled } from "../KeyProcessor";

const ReturnProcessor: KeyProcessor = {
  handle({ name }, content: string, cursor: number) {
    if (name === "return") {
      return handled(
        `${content.substring(0, cursor)}\n${content.substring(cursor)}`,
        cursor + 1
      );
    }
    return notHandled;
  }
};
export default ReturnProcessor;
