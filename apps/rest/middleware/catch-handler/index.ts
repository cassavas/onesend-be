import express from 'express';
import { responseError } from 'rest/middleware/response/error';
import { Context } from 'shared/context';

export const catchHandler = (handler: (ctx: Context, req: express.Request, res: express.Response) => Promise<void> | void) => {
  return async (req: express.Request, res: express.Response) => {
    try {
      await handler(res.locals.ctx, req, res);
    } catch (e) {
      responseError(e, req, res);
    }
  };
};
