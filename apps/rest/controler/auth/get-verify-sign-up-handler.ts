import express from 'express';
import { responseError } from 'rest/middleware/response/error';
import { LogError } from 'shared/error/logError';
import { Context } from 'shared/context';
import { ErrorVars } from 'shared/error/errorVars';
import { updateActiveUser } from 'shared/services/auth/update-active-user';
import { responseSuccess } from 'rest/middleware/response/success';

export const getVerifySignUpHandler = async (ctx: Context, req: express.Request<any, any, any, { token?: string }>, res: express.Response) => {
  if (!req.query.token) {
    responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
    return;
  }

  const payload = global._crypto.verifyActiveToken(req.query.token);

  await updateActiveUser(payload.email);

  responseSuccess(req, res, {}, true);
};
