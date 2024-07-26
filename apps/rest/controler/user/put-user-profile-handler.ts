import express from 'express';
import { responseSuccess } from 'rest/middleware/response/success';
import { Context } from 'shared/context';
import { responseError } from 'rest/middleware/response/error';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { updateUserService } from 'shared/services/user/update-user-service';
import { phoneValidation } from 'shared/helpers/function';

export const putUserProfileHandler = async (ctx: Context, req: express.Request, res: express.Response) => {
  const firstName = req.body.firstName.trim() as string;
  const lastName = req.body.lastName.trim() as string;
  const phoneNumber = req.body.phoneNumber.trim() as string;
  const address = req.body.address.trim() as string;

  if (!ctx.userId) {
    responseError(new LogError(ErrorVars.E001_NOT_PERMISSION, 'AUTHENTICATION'), req, res);
    return;
  }

  if (!firstName || (req.body.firstName && (!firstName || firstName.length > 24))) {
    responseError(new LogError(ErrorVars.E008_USERNAME_INVALID, 'LOGIC'), req, res);
    return;
  }

  if (!lastName || (req.body.lastName && (!lastName || lastName.length > 24))) {
    responseError(new LogError(ErrorVars.E008_USERNAME_INVALID, 'LOGIC'), req, res);
    return;
  }

  if (!phoneNumber || (req.body.phoneNumber && !phoneValidation(req.body.phoneNumber))) {
    responseError(new LogError(ErrorVars.E010_PHONE_NUMBER_INVALID, 'LOGIC'), req, res);
    return;
  }

  if (req.body.address && (!address || address.length > 255)) {
    responseError(new LogError(ErrorVars.E011_ADDRESS_INVALID, 'LOGIC'), req, res);
    return;
  }

  const updatedUser = await updateUserService(ctx.userId, firstName, lastName, phoneNumber, address);
  responseSuccess(req, res, {
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    phoneNumber: updatedUser.phoneNumber,
    address: updatedUser.address
  });
};
