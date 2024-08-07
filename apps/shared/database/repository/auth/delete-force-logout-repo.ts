export const deleteForceLogoutRepo = (userId: number) => {
  return global.prisma.userToken.deleteMany({
    where: {
      userId: userId
    }
  });
};
