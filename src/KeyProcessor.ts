type KeyProcessorResponse = {
  content?: string;
  cursor?: number;
  handled: boolean;
};

export const notHandled = { handled: false };

export const handled = (content: string, cursor: number) => ({
  handled: true,
  content,
  cursor
});

export type KeyPress = {
  sequence: string;
  name: string;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  code: string;
};

export default interface KeyProcessor {
  handle(key: KeyPress, content: string, cursor: number): KeyProcessorResponse;
}

