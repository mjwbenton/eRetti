import KeyProcessor, { notHandled, handled } from "../KeyProcessor";

const BackspaceProcessor: KeyProcessor = {
  handle({ name }, content: string, cursor: number) {
    if (name !== "backspace") {
      return notHandled;
    }
    if (cursor === 0) {
      return handled(content, cursor);
    }
    return handled(
      `${content.substring(0, cursor - 1)}${content.substring(cursor)}`,
      cursor - 1
    );
  }
};
export default BackspaceProcessor;
