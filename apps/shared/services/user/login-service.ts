import { userValidation } from 'shared/helpers/validation';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';
import { insertTokenRepo } from 'shared/database/repository/auth/insert-token-repo';
import { LoginPayloadResponse } from 'shared/types/auth';

export const loginService = async (email: string, password: string): Promise<LoginPayloadResponse> => {
  const user = await userValidation(email);

  if (user.type !== 'standard') {
    throw new LogError(ErrorVars.E009_USER_METHOD_NOT_ALLOW, 'LOGIC');
  }

  if (!global._crypto.comparePassword(password, user!.password ?? '')) {
    throw new LogError(ErrorVars.E006_PASSWORD_INVALID, 'LOGIC');
  }

  const accessToken = global._crypto.generateAuthToken(email);

  const date = new Date();
  date.setDate(date.getDate() + 30);
  insertTokenRepo(accessToken, user.id, date);

  return {
    accessToken: accessToken,
    user: {
      id: user.publicId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      expired: date
    }
  };
};
