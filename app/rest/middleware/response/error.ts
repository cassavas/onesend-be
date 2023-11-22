import express from 'express';
import { LogError } from 'shared/error/logError.ts';

export const responseError = (e: Error | any, req: express.Request, res: express.Response) => {
  let status;
  if (e instanceof LogError) {
    switch ((e as LogError).name) {
      case 'LOGIC':
        status = 422;
        res.status(422).json({
          errors: {
            fields: (e as LogError).fields ? [(e as LogError).fields] : []
          },
          code: (e as LogError).message
        });
        break;
      case 'INTEGRATION':
        status = 500;
        res.sendStatus(500);
        break;
      case 'AUTHENTICATION':
        status = 401;
        res.sendStatus(401);
        break;
      case 'AUTHORISATION':
        status = 403;
        res.sendStatus(403);
        break;
    }
  } else {
    status = 500;
    res.sendStatus(500);
  }

  const body = req.body;
  if (body.password && process.env.NODE_ENV !== 'dev') {
    body.password = '[HIDDEN]';
  }

  if (body.access_token && process.env.NODE_ENV !== 'dev') {
    body.access_token = '[HIDDEN]';
  }

  if (status === 500) {
    res.locals.ctx.logger
      .child({
        error: e,
        stack: e.stack,
        status,
        body,
        query: req.query
      })
      .error(`Controller error catch: ${e.message}`);
  } else {
    res.locals.ctx.logger
      .child({
        error: e,
        stack: e.stack,
        status,
        body,
        query: req.query
      })
      .warn(`Controller error catch: ${e.message}`);
  }
};
