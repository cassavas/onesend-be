export const rGetUserByEmail = async (email: string) => {
  return global.prisma.user.findUnique({
    where: { email }
  });
};

export const rGetUserById = async (id: number) => {
  return global.prisma.user.findUnique({
    where: { id }
  });
};
