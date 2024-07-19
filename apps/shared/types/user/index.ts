export type USER_TOKEN_PAYLOAD = {
  userId: number;
  email: string;
  mode?: 'VERIFY' | 'FORGOT';
};

export type USER = {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  deletedAt?: Date;
};
