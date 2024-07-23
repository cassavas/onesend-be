import { Context } from 'shared/context';
import express from 'express';
import { responseError } from 'rest/middleware/response/error';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { emailValidation } from 'shared/helpers/function';
import { responseSuccess } from 'rest/middleware/response/success';
import { registerService } from 'shared/services/user/register-service';

type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
export const postSignUpHandler = async (ctx: Context, req: express.Request<any, any, RegisterPayload>, res: express.Response) => {
  if (!req.body.email || !emailValidation(req.body.email)) {
    responseError(new LogError(ErrorVars.E002_EMAIL_INVALID, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.password || (req.body.password && !req.body.password.trim())) {
    responseError(new LogError(ErrorVars.E006_PASSWORD_INVALID, 'LOGIC'), req, res);
    return;
  }

  if (req.body.password.trim().length < 8) {
    responseError(new LogError(ErrorVars.E006_PASSWORD_INVALID, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.firstName || (req.body.firstName && (!req.body.firstName.trim() || req.body.firstName.trim().length > 50))) {
    responseError(new LogError(ErrorVars.E008_USERNAME_INVALID, 'LOGIC'), req, res);
    return;
  }

  if (!req.body.lastName || (req.body.lastName && (!req.body.lastName.trim() || req.body.lastName.trim().length > 50))) {
    responseError(new LogError(ErrorVars.E008_USERNAME_INVALID, 'LOGIC'), req, res);
    return;
  }

  await registerService(req.body.email, req.body.firstName, req.body.lastName, 'standard', req.body.password);

  responseSuccess(req, res, {}, true);
};
