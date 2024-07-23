import express from 'express';
import { responseError } from 'rest/middleware/response/error';
import { ErrorVars } from 'shared/error/errorVars';
import { LogError } from 'shared/error/logError';
import { isAccessTokenValid } from 'shared/services/auth/is-access-token-valid';
import { emailValidation } from 'shared/helpers/function';

export const auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!req.headers.authorization) {
      responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
      return;
    }

    if (!req.headers['x-auth-email'] || (req.headers['x-auth-email'] && !emailValidation(req.headers['x-auth-email'] as string))) {
      responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    const email = req.headers['x-auth-email'] as string;

    const isValid = global._crypto.verifyAuthToken(token, email);

    if (!isValid) {
      responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
      return;
    }

    if (!(await isAccessTokenValid(token, email))) {
      responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
      return;
    }

    return next();
  } catch (error) {
    responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
  }
};
