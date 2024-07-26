import { Context } from 'shared/context';
import express from 'express';
import { responseError } from 'rest/middleware/response/error';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { responseSuccess } from 'rest/middleware/response/success';
import { resetPasswordService } from 'shared/services/auth/reset-password-service';
import { passwordRegex } from 'shared/types/const';
import { passwordValidation } from 'shared/helpers/function';

export const putResetPasswordHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  const token = req.query.token as string;
  const payload = global._crypto.verifyActiveToken(token);
  const password = req.body.password as string;

  if (!password || (password && (!passwordValidation(password) || !password.trim()))) {
    responseError(new LogError(ErrorVars.E006_PASSWORD_INVALID, 'LOGIC'), req, res);
    return;
  }

  if (password.trim().length < 8) {
    responseError(new LogError(ErrorVars.E006_PASSWORD_INVALID, 'LOGIC'), req, res);
    return;
  }

  await resetPasswordService(payload.email, password);

  responseSuccess(req, res, {}, true);
};
