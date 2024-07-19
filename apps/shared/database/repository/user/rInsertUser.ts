export const rInsertUser = async (email: string, password: string, name: string) => {
  return await global.prisma.user.create({
    data: {
      email,
      password: global._crypto.hashPassword(password),
      name
    }
  });
};
