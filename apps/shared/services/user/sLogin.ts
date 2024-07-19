import { userValidation } from 'shared/helpers/validation';
import { LogError } from 'shared/error/logError';
import { ErrorVars } from 'shared/error/errorVars';

export const sLogin = async (email: string, password: string): Promise<string> => {
  const user = await userValidation(email);

  if (!global._crypto.comparePassword(password, user.password)) {
    throw new LogError(ErrorVars.E006_PASSWORD_INVALID, 'LOGIC');
  }
  return global._crypto.signToken({ userId: user.id, email: user.email });
};
