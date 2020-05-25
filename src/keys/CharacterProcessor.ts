import KeyProcessor, { notHandled, handled } from "../KeyProcessor";

const CharacterProcessor: KeyProcessor = {
  handle({ sequence }, content: string, cursor: number) {
    if (sequence) {
      return handled(
        `${content.substring(0, cursor)}${sequence}${content.substring(
          cursor
        )}`,
        cursor + 1
      );
    }
    return notHandled;
  }
};
export default CharacterProcessor;
