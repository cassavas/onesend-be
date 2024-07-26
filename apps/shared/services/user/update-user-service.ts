import { updateUserProfileRepo } from 'shared/database/repository/user/update-user-profile-repo';
import { userValidationById } from 'shared/helpers/validation';
import { USER_PROFILE } from 'shared/types/user';

export const updateUserService = async (userId: number, firstName: string, lastName: string, phoneNumber: string, address: string): Promise<USER_PROFILE> => {
  const user = await userValidationById(userId);

  return updateUserProfileRepo(user.id, firstName, lastName, phoneNumber, address);
};
