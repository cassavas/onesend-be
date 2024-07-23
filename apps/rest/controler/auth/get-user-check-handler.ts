import express from 'express';
import { responseError } from 'rest/middleware/response/error';
import { responseSuccess } from 'rest/middleware/response/success';
import { LogError } from 'shared/error/logError';
import { Context } from 'shared/context';
import { emailValidation } from 'shared/helpers/function';
import { ErrorVars } from 'shared/error/errorVars';
import { getUserAuthTypeService } from 'shared/services/auth/get-user-auth-type-service';

export const getUserCheckHandler = async (ctx: Context, req: express.Request<{ email?: string }>, res: express.Response) => {
  if (!req.params.email || (req.params.email && !emailValidation(req.params.email))) {
    responseError(new LogError(ErrorVars.E002_EMAIL_INVALID, 'LOGIC'), req, res);
    return;
  }

  const type = await getUserAuthTypeService(req.params.email);

  responseSuccess(req, res, { type: type });
};
