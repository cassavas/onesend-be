export const deleteForceLogoutRepo = (userId: number, token: string) => {
  return global.prisma.userToken.deleteMany({
    where: {
      userId: userId,
      token: { notIn: [token] }
    }
  });
};
