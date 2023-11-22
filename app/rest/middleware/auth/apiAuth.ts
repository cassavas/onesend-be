import express from 'express';
import jwt from 'jsonwebtoken';
import { responseError } from 'rest/middleware/response/error';
import { ErrorVars } from 'shared/error/errorVars';
import { LogError } from 'shared/error/logError.ts';

export const auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!req.headers.authorization) {
      responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
      return;
    }
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN ?? '');
    return next();
  } catch (error) {
    responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHORISATION'), req, res);
  }
};
