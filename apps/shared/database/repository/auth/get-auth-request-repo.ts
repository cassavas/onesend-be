export const rGetAuthRequestByUserId = async (userId: number, type: string) => {
  return global.prisma.authRequest.findFirst({
    where: { userId, type }
  });
};
