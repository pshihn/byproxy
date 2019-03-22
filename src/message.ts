import { RestError } from './error';

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