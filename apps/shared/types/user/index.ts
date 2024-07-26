export type USER = {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  deletedAt?: Date;
  active: boolean;
  phoneNumber: string;
  address: string;
};

export type USER_PROFILE = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  address: string | null;
};
