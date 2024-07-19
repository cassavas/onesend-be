import { Context } from 'shared/context';
import express from 'express';
import { responseError } from 'rest/middleware/response/error';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { emailValidation } from 'shared/helpers/function';
import { responseSuccess } from 'rest/middleware/response/success';
import { sRegister } from 'shared/services/user/sRegister';

type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};
export const registerHandler = async (ctx: Context, req: express.Request<any, any, RegisterPayload>, res: express.Response) => {
  if (!req.body.email || !emailValidation(req.body.email)) {
    responseError(new LogError(ErrorVars.E002_EMAIL_INVALID, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.password || (req.body.password && !req.body.password.trim())) {
    responseError(new LogError(ErrorVars.E006_PASSWORD_INVALID, 'LOGIC'), req, res);
    return;
  }

  if (req.body.password.trim().length < 6) {
    responseError(new LogError(ErrorVars.E006_PASSWORD_INVALID, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.name || (req.body.name && !req.body.name.trim())) {
    responseError(new LogError(ErrorVars.E008_USERNAME_INVALID, 'LOGIC'), req, res);
    return;
  }

  await sRegister(req.body.email, req.body.password, req.body.name);

  responseSuccess(req, res, {}, true);
};
