import { inject, injectable } from 'tsyringe';
import { User } from '@prisma/client';

import type CreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import { hash } from 'bcrypt';

export interface ICreateUserData extends CreateUserDTO {
  password: string;
  email: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserData): Promise<User> {
    const userAlreadyExists = await this.userRepository.findOneByEmail(
      data.email
    );

    if (userAlreadyExists) throw new Error('User already exists');

    const passwordHashed = await hash(data.password, 8);

    const user = await this.userRepository.create({
      ...data,
      password: passwordHashed
    });

    return {
      ...user,
      password: passwordHashed
    };
  }
}

export default CreateUserUseCase;
