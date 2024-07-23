import { rGetUserByEmail } from 'shared/database/repository/user/get-user-repo';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { insertUserRepo } from 'shared/database/repository/user/insert-user-repo';
import { MailTransport } from 'shared/provider/mail-transport';
import { verifySubject } from 'shared/types/const';
import { verifyTemplate } from 'shared/types/template/verifyEmail';
import { LoginPayloadResponse } from 'shared/types/auth';
import { insertTokenRepo } from 'shared/database/repository/auth/insert-token-repo';

export const registerService = async (email: string, firstName: string, lastName: string, type: string, password?: string): Promise<void | LoginPayloadResponse> => {
  const user = await rGetUserByEmail(email);

  if (user && user.deletedAt) {
    throw new LogError(ErrorVars.E005_USER_IS_DELETED, 'LOGIC');
  }

  if (user && user.active) {
    throw new LogError(ErrorVars.E007_USER_EXISTS, 'LOGIC');
  }

  if (type !== 'standard') {
    const newUser = await insertUserRepo(email, firstName, lastName, type);

    const accessToken = global._crypto.generateAuthToken(email);

    const date = new Date();
    date.setDate(date.getDate() + 30);
    insertTokenRepo(accessToken, newUser.id, date);

    return {
      accessToken: accessToken,
      user: {
        id: newUser.publicId,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        expired: date
      }
    };
  }

  const newUser = await insertUserRepo(email, firstName, lastName, type, password);
  const token = global._crypto.signActiveToken({ email: newUser.email });

  const sender = new MailTransport();
  await sender.send(email, verifySubject, verifyTemplate(`https://${process.env.HOST}/v1/auth/verify?token=${token}`));
};
