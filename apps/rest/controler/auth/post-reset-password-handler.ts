import { Context } from 'shared/context';
import express from 'express';
import { emailValidation } from 'shared/helpers/function';
import { responseError } from 'rest/middleware/response/error';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { requestResetPassword } from 'shared/services/auth/requset-reset-password';
import { responseSuccess } from 'rest/middleware/response/success';

export const postResetPasswordHandler = async (ctx: Context, req: express.Request<any, any, { email?: string }>, res: express.Response) => {
  const email = req.body.email?.trim();

  if (!email || !emailValidation(email)) {
    responseError(new LogError(ErrorVars.E002_EMAIL_INVALID, 'LOGIC'), req, res);
    return;
  }

  await requestResetPassword(email);
  responseSuccess(req, res, {}, true);
};
