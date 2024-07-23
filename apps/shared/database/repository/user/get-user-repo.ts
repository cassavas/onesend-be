export const rGetUserByEmail = async (email: string) => {
  return global.prisma.user.findUnique({
    where: { email }
  });
};
