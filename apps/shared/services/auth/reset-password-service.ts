import { userValidation } from 'shared/helpers/validation';
import { updatePasswordRepo } from 'shared/database/repository/auth/update-password-repo';

export const resetPasswordService = async (email: string, password: string) => {
  const user = await userValidation(email);

  await updatePasswordRepo(user.id, password);
};
