import { userValidation } from 'shared/helpers/validation';
import { USER_PROFILE } from 'shared/types/user';

export const getUserService = async (email: string): Promise<USER_PROFILE> => {
  const user = await userValidation(email);

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    address: user.address
  };
};
