import { Context } from 'shared/context';
import express from 'express';
import { responseError } from 'rest/middleware/response/error';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { responseSuccess } from 'rest/middleware/response/success';
import { resetPasswordService } from 'shared/services/auth/reset-password-service';
import { passwordValidation } from 'shared/helpers/function';

export const putResetPasswordHandler = async (ctx: Context, req: express.Request<any, any, { password?: string }, { token?: string }>, res: express.Response) => {
  const token = req.query.token?.trim();
  const password = req.body.password?.trim();

  if (!token) {
    responseError(new LogError(ErrorVars.E012_INCORRECT_TOKEN, 'LOGIC'), req, res);
    return;
  }

  const payload = global._crypto.verifyActiveToken(token);

  if (!password || (password && !passwordValidation(password))) {
    responseError(new LogError(ErrorVars.E006_PASSWORD_INVALID, 'LOGIC'), req, res);
    return;
  }

  await resetPasswordService(payload.email, password);

  responseSuccess(req, res, {}, true);
};
