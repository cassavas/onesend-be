import { newPublicId } from 'shared/helpers/function';

export const insertAuthRequestRepo = async (userId: number, type: string, limit: number) => {
  return global.prisma.authRequest.create({
    data: {
      userId: userId,
      publicId: newPublicId(),
      type,
      limit
    }
  });
};
