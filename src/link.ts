import { Message, MessageResponse } from './message.js';
import { RestError } from './error.js';

type Remote = (message: Message) => Promise<any>;

async function post<T>(url: string, data: any, includeCredentials: boolean): Promise<T> {
  const init: RequestInit = { method: 'POST', credentials: includeCredentials ? 'include' : 'same-origin', body: JSON.stringify(data) };
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  init.headers = headers;
  const request = new Request(url, init);
  const response = await fetch(request);
  if (!response.ok) {
    const message = await response.text();
    throw new RestError(response.status, message);
  }
  return (await response.json()) as T;
}

function createRemote(url: string): Remote {
  return function (message: Message): Promise<MessageResponse> {
    return new Promise<MessageResponse>((resolve, reject) => {
      post<MessageResponse>(url, message, false).then((response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.value);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

function proxy<T extends object | Function>(remote: Remote, path: PropertyKey[] = []): T {
  return new Proxy<T>((function () { }) as T, {

    get(_, prop: PropertyKey, receiver: any) {
      if (prop === 'then') {
        if (path.length === 0) {
          return { then: () => receiver };
        }
        const p = remote({ type: 'GET', path });
        return p.then.bind(p);
      }
      return proxy<T>(remote, path.concat(prop));
    },

    set(_, prop: PropertyKey, value: any): any {
      return remote({ type: 'SET', path: path.concat(prop), args: [value] });
    },

    apply(_, __, argArray?: any): any {
      return remote({ type: 'APPLY', path, args: argArray || [] });
    }

  });
}

export function link<T extends object | Function>(url: string): T {
  return proxy<T>(createRemote(url));
}