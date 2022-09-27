import { sign } from 'jsonwebtoken';

import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import { compare } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

type Request = {
  email: string;
  password: string;
};

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: Request) {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) throw new Error('email and/or password dont match');

    const rawPassword = await compare(password, user.password);

    if (!rawPassword) throw new Error('email and/or password dont match');

    const token = sign({}, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN,
      subject: user.id
    });

    return token;
  }
}

export default AuthenticateUserUseCase;
