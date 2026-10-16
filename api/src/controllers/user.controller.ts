import type { Request, Response } from 'express';
import { ZodError } from 'zod';
import * as UserService from '../services/user.service.ts';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema.ts';
import { UserNotFoundError } from '../services/user.service.ts';

function handleError(error: unknown, response: Response): void {
  if (error instanceof ZodError) {
    response.status(400).json({
      message: 'Dados inválidos.',
      errors: error.issues
    });
    return;
  }

  if (error instanceof UserNotFoundError) {
    response.status(404).json({ message: error.message });
    return;
  }

  response.status(500).json({ message: 'Erro interno do servidor.' });
}

export async function getAllUsers(_request: Request, response: Response): Promise<void> {
  try {
    const users = await UserService.findAllUsers();
    response.status(200).json(users);
  } catch (error) {
    handleError(error, response);
  }
}

export async function getUserById(request: Request, response: Response): Promise<void> {
  try {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      response.status(400).json({ message: 'ID inválido.' });
      return;
    }

    const user = await UserService.findUserById(id);
    response.status(200).json(user);
  } catch (error) {
    handleError(error, response);
  }
}

export async function createUser(request: Request, response: Response): Promise<void> {
  try {
    const data = createUserSchema.parse(request.body);
    const user = await UserService.insertUser(data);
    response.status(201).json(user);
  } catch (error) {
    handleError(error, response);
  }
}

export async function updateUser(request: Request, response: Response): Promise<void> {
  try {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      response.status(400).json({ message: 'ID inválido.' });
      return;
    }

    const data = updateUserSchema.parse(request.body);
    const user = await UserService.modifyUser(id, data);
    response.status(200).json(user);
  } catch (error) {
    handleError(error, response);
  }
}

export async function deleteUser(request: Request, response: Response): Promise<void> {
  try {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      response.status(400).json({ message: 'ID inválido.' });
      return;
    }

    await UserService.removeUser(id);
    response.status(204).send();
  } catch (error) {
    handleError(error, response);
  }
}
