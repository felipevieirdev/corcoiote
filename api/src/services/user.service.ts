import prisma from '../lib/prisma.ts';
import type { CreateUser, UpdateUser } from '../schemas/user.schema.ts';
import type { User } from '../types/user.type.ts';

const userSelect = {
  id: true,
  name: true,
  email: true,
  createdAt: true
} as const;

export class UserNotFoundError extends Error {
  constructor(id: number) {
    super(`Usuário de id ${id} não encontrado.`);
    this.name = 'UserNotFoundError';
  }
}

export async function findAllUsers(): Promise<User[]> {
  return prisma.user.findMany({
    select: userSelect,
    orderBy: { createdAt: 'desc' }
  });
}

export async function findUserById(id: number): Promise<User> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userSelect
  });

  if (!user) throw new UserNotFoundError(id);

  return user;
}

export async function insertUser(data: CreateUser): Promise<User> {
  return prisma.user.create({
    data,
    select: userSelect
  });
}

export async function modifyUser(id: number, data: UpdateUser): Promise<User> {
  await findUserById(id);

  return prisma.user.update({
    where: { id },
    data,
    select: userSelect
  });
}

export async function removeUser(id: number): Promise<void> {
  await findUserById(id);
  await prisma.user.delete({ where: { id } });
}
