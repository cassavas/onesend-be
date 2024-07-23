export type USER = {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  deletedAt?: Date;
};
