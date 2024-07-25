import express from 'express';
import { responseSuccess } from 'rest/middleware/response/success';
import { Context } from 'shared/context';
import { responseError } from 'rest/middleware/response/error';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { updateUserService } from 'shared/services/user/update-user-service';
import { emailValidation } from 'shared/helpers/function';

export const postUserProfileHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  try {
    const email = req.headers['x-auth-email'] as string;

    if (!req.body.email || !emailValidation(req.body.email)) {
      responseError(new LogError(ErrorVars.E002_EMAIL_INVALID, 'LOGIC'), req, res);
      return;
    }

    if (!req.body.firstName || (req.body.firstName && (!req.body.firstName.trim() || req.body.firstName.trim().length > 24))) {
      responseError(new LogError(ErrorVars.E008_USERNAME_INVALID, 'LOGIC'), req, res);
      return;
    }

    if (!req.body.lastName || (req.body.lastName && (!req.body.lastName.trim() || req.body.lastName.trim().length > 24))) {
      responseError(new LogError(ErrorVars.E008_USERNAME_INVALID, 'LOGIC'), req, res);
      return;
    }

    if (!req.body.phoneNumber || (req.body.phoneNumber && (!req.body.phoneNumber.trim() || req.body.phoneNumber.trim().length > 15))) {
      responseError(new LogError(ErrorVars.E010_PHONE_NUMBER_INVALID, 'LOGIC'), req, res);
      return;
    }

    if (req.body.address && (!req.body.address.trim() || req.body.address.trim().length > 255)) {
      responseError(new LogError(ErrorVars.E011_ADDRESS_INVALID, 'LOGIC'), req, res);
      return;
    }

    await updateUserService(req.body.email, req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.address);

    responseSuccess(req, res, {});
  } catch (error) {
    console.log({ error });
    responseError(new LogError(ErrorVars.E012_BAD_REQUEST, 'LOGIC'), req, res);
  }
};
