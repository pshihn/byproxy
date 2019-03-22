import { Application } from 'express'
import { Message, MessageResponse } from './message';
import { RestError } from './error';

export function serve(app: Application, restPath: string, target: any): void {
  const reducePath = (list: PropertyKey[]) => list.reduce((o: any, prop) => (o ? Reflect.get(o, prop) : o), target);
  app.post(restPath, async (req, res) => {
    const body = req.body;
    const response: MessageResponse = {};
    try {
      const payload: Message = (typeof body === 'string') ? JSON.parse(body) : body;
      if (!(payload && payload.type && payload.path)) {
        throw new RestError(400, 'Invalid payload');
      }
      payload.args = payload.args || [];
      const ref = reducePath(payload.path);
      const refParent = reducePath(payload.path.slice(0, -1));
      switch (payload.type) {
        case 'GET':
          response.value = ref;
          break;
        case 'SET':
          const setProp = payload.path.length && payload.path.pop();
          if (setProp) {
            response.value = Reflect.set(refParent, setProp, payload.args[0]);
          }
          break;
        case 'APPLY':
          response.value = await Reflect.apply(ref, refParent, payload.args);
          break;
        default:
          response.error = new RestError(400, 'Invalid payload type');
      }
    } catch (err) {
      response.error = new RestError(err.code || 500, err.message || 'Internal error');
    }
    res.status(200).json(response);
  });
}