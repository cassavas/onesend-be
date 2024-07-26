import { userValidation } from 'shared/helpers/validation';
import { updatePasswordRepo } from 'shared/database/repository/user/update-password-repo';

export const resetPasswordService = async (email: string, password: string) => {
  const user = await userValidation(email);

  const newPassword = await updatePasswordRepo(user.id, password);
};
