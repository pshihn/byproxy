export class RestError extends Error {
  readonly code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export type MessageType = 'GET' | 'SET' | 'APPLY';

export interface Message {
  type: MessageType;
  path: PropertyKey[];
  args?: any[]
}

export interface MessageResponse {
  value?: any;
  error?: RestError;
}