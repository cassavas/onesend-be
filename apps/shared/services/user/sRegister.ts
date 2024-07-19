import { rGetUserByEmail } from 'shared/database/repository/user/rGetUser';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { rInsertUser } from 'shared/database/repository/user/rInsertUser';
import { MailTransport } from 'shared/config/mailTransport';
import { verifySubject } from 'shared/types/const';
import { verifyTemplate } from 'shared/types/template/verifyEmail';

export const sRegister = async (email: string, password: string, name: string): Promise<void> => {
  const user = await rGetUserByEmail(email);

  if (user && user.deletedAt) {
    throw new LogError(ErrorVars.E005_USER_IS_DELETED, 'LOGIC');
  }

  if (user && user.active) {
    throw new LogError(ErrorVars.E007_USER_EXISTS, 'LOGIC');
  }

  const newUser = await rInsertUser(email, password, name);
  const token = global._crypto.signToken({ userId: newUser.id, email: newUser.email, mode: 'VERIFY' }, process.env.PASSWORD_TOKEN);

  const sender = new MailTransport();
  await sender.send(email, verifySubject, verifyTemplate(`https://${process.env.HOST}/v1/verify?token=${token}`));
};
