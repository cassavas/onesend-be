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
  console.log(request);
  const limitRequestToday = 5;

  if (!request) {
    await insertAuthRequestRepo(user.id, 'reset', 1);
  }

  if (request && !isToday(request.updatedAt)) {
    await updateAuthRequestRepo(request.id, 0, currentDate);
  }

  if (request && request.limit < limitRequestToday) {
    let limit = request.limit;
    limit++;
    await updateAuthRequestRepo(request.id, limit, currentDate);
  } else {
    throw new LogError(ErrorVars.E015_LIMIT_REQUEST_TODAY, 'LOGIC');
  }

  const token = global._crypto.signActiveToken({ email: user.email });
  await global.sender.send(email, resetPasswordSubject, resetPasswordTemplate(`https://${process.env.HOST}/auth/URL?token=${token}`));
};
