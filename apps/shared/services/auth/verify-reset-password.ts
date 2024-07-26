import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { MailTransport } from 'shared/provider/mail-transport';
import { resetPasswordSubject } from 'shared/types/const';
import { userValidation } from 'shared/helpers/validation';
import { resetPasswordTemplate } from 'shared/types/template/resetPasswordEmail';

export const verifyResetPassword = async (email: string) => {
  const user = await userValidation(email);
  const userType = 'standard';
  const responseEmail = user.email;

  if (user.type !== userType) {
    throw new LogError(ErrorVars.E009_USER_METHOD_NOT_ALLOW, 'LOGIC');
  }

  const token = global._crypto.resetPasswordToken({ email: user.email });

  const sender = new MailTransport();
  await sender.send(email, resetPasswordSubject, resetPasswordTemplate(`https://${process.env.HOST}/auth/URL?token=${token}`));

  return {
    responseEmail
  };
};
