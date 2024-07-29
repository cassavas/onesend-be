import { Context } from 'shared/context';
import express from 'express';
import { responseSuccess } from 'rest/middleware/response/success';
import { verifyResetPassword } from 'shared/services/auth/verify-reset-password';
import { emailValidation } from 'shared/helpers/function';
import { responseError } from 'rest/middleware/response/error';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';

export const postResetPasswordHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  const email = req.body.email as string; // add type at req: express.Request see putResetPasswordHandler
  // don't use "as string" or as any type if it do not necessary
  if (!email || !emailValidation(email)) {
    responseError(new LogError(ErrorVars.E002_EMAIL_INVALID, 'LOGIC'), req, res);
    return;
  }

  const responseEmail = await verifyResetPassword(email); // ??

  responseSuccess(req, res, {}, true); //??
};
