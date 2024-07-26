import { userValidationById } from 'shared/helpers/validation';
import { USER_PROFILE } from 'shared/types/user';

export const getUserService = async (userId: number): Promise<USER_PROFILE> => {
  return await userValidationById(userId);
};
