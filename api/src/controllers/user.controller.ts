import type { Request, Response } from 'express';
import * as UserService from '../services/user.service.ts';
import type { CreateUser, UpdateUser } from '../types/user.type.ts';

export function getAllUsers(_request: Request, response: Response): void {
  const users = UserService.findAllUsers();

  response.status(200).json(users);
}

export function getUserById(request: Request, response: Response): void {
  const id = Number(request.params.id);

  const user = UserService.findUserById(id);

  response.status(200).json(user);
}

export function createUser(request: Request, response: Response): void {
  const { name, email, password } = request.body as CreateUser;

  const user = UserService.insertUser({ name, email, password });

  response.status(201).json(user);
}

export function updateUser(request: Request, response: Response): void {
  const id = Number(request.params.id);
  const { name, email, password } = request.body as UpdateUser;

  const user = UserService.modifyUser(id, { name, email, password });

  response.status(200).json(user);
}

export function deleteUser(request: Request, response: Response): void {
  UserService.removeUser(+request.params.id);

  response.status(204).send();
}
