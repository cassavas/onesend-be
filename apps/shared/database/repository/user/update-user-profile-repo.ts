export const updateUserProfileRepo = (id: number, firstName: string, lastName: string, phoneNumber: string, address: string) => {
  return global.prisma.user.update({
    where: {
      id
    },
    data: {
      firstName,
      lastName,
      phoneNumber,
      address
    }
  });
};
