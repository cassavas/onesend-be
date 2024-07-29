import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { resetPasswordSubject } from 'shared/types/const';
import { userValidation } from 'shared/helpers/validation';
import { resetPasswordTemplate } from 'shared/types/template/resetPasswordEmail';

// name have to change to requestResetPassword
export const verifyResetPassword = async (email: string) => {
  const user = await userValidation(email);

  const responseEmail = user.email; // ??

  if (user.type !== 'standard') {
    throw new LogError(ErrorVars.E009_USER_METHOD_NOT_ALLOW, 'LOGIC');
  }

  const token = global._crypto.resetPasswordToken({ email: user.email });

  // using global.sender dont new again
  await global.sender.send(email, resetPasswordSubject, resetPasswordTemplate(`https://${process.env.HOST}/auth/URL?token=${token}`));

  // why return here
  return {
    responseEmail
  };
};
