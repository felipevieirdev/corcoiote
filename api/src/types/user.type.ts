export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
};

export type { CreateUser, UpdateUser } from '../schemas/user.schema.ts';
