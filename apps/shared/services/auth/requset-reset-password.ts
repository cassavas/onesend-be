import { userValidation } from 'shared/helpers/validation';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { resetPasswordSubject } from 'shared/types/const';
import { resetPasswordTemplate } from 'shared/types/template/resetPasswordEmail';
import { isToday } from 'shared/helpers/function';
import { rGetAuthRequestByUserId } from 'shared/database/repository/auth/get-auth-request-repo';
import { insertAuthRequestRepo } from 'shared/database/repository/auth/insert-auth-request-repo';
import { updateAuthRequestRepo } from 'shared/database/repository/auth/update-auth-request-repo';

export const requestResetPassword = async (email: string) => {
  const user = await userValidation(email);
  const currentDate = new Date();

  if (user.type !== 'standard') {
    throw new LogError(ErrorVars.E009_USER_METHOD_NOT_ALLOW, 'LOGIC');
  }

  const request = await rGetAuthRequestByUserId(user.id, 'reset');
  const limitRequestToday = 5;
  let requestLimit = request!.limit;

  if (!request) {
    await insertAuthRequestRepo(user.id, 'reset', 1);
  }

  if (request && !isToday(request.updatedAt)) {
    requestLimit = 0;
    await updateAuthRequestRepo(request.id, requestLimit, currentDate);
  }

  if (request && requestLimit < limitRequestToday) {
    requestLimit++;
    await updateAuthRequestRepo(request.id, requestLimit, currentDate);
  } else {
    throw new LogError(ErrorVars.E015_LIMIT_REQUEST_TODAY, 'LOGIC');
  }

  // const token = global._crypto.signActiveToken({ email: user.email });
  // await global.sender.send(email, resetPasswordSubject, resetPasswordTemplate(`https://${process.env.HOST}/auth/URL?token=${token}`));
};
