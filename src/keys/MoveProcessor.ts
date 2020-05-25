import KeyProcessor, { notHandled, handled } from "../KeyProcessor";

const MoveProcessor: KeyProcessor = {
  handle({ name }, content: string, cursor: number) {
    if (name === "left") {
      if (cursor !== 0) {
        return handled(content, cursor - 1);
      }
      return handled(content, cursor);
    } else if (name === "right") {
      console.dir({ content, cursor });
      if (cursor !== content.length) {
        return handled(content, cursor + 1);
      }
      return handled(content, cursor);
    }
    return notHandled;
  }
};
export default MoveProcessor;
