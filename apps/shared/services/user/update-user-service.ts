import { updateUserProfileRepo } from 'shared/database/repository/user/update-user-profile-repo';
import { rGetUserByEmail } from 'shared/database/repository/user/get-user-repo';

export const updateUserService = async (email: string, firstName: string, lastName: string, phoneNumber: string, address: string) => {
  const user = await rGetUserByEmail(email);
  // @ts-ignore
  const updateUser = await updateUserProfileRepo(user.id, firstName, lastName, phoneNumber, address);
};
