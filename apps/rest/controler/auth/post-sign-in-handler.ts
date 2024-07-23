import express from 'express';
import { responseError } from 'rest/middleware/response/error';
import { responseSuccess } from 'rest/middleware/response/success';
import { LogError } from 'shared/error/logError';
import { Context } from 'shared/context';
import { emailValidation } from 'shared/helpers/function';
import { ErrorVars } from 'shared/error/errorVars';
import { loginService } from 'shared/services/user/login-service';

type LoginPayload = {
  email: string;
  password: string;
};

export const postSignInHandler = async (ctx: Context, req: express.Request<any, any, LoginPayload>, res: express.Response) => {
  if (!req.body.email || (req.body.email && !emailValidation(req.body.email))) {
    responseError(new LogError(ErrorVars.E002_EMAIL_INVALID, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.password || (req.body.password && !req.body.password.trim())) {
    responseError(new LogError(ErrorVars.E006_PASSWORD_INVALID, 'LOGIC'), req, res);
    return;
  }

  if (req.body.password.length < 8) {
    responseError(new LogError(ErrorVars.E006_PASSWORD_INVALID, 'LOGIC'), req, res);
    return;
  }

  const payload = await loginService(req.body.email, req.body.password);

  responseSuccess(req, res, payload);
};
