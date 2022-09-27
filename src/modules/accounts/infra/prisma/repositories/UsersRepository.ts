import { injectable, inject } from 'tsyringe';
import { PrismaClient, User } from '@prisma/client';

import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';

@injectable()
class UsersRepository implements IUsersRepository {
  constructor(
    @inject('PrismaClient')
    private prismaClient: PrismaClient
  ) {}

  async create(data: ICreateUserDTO): Promise<User> {
    return await this.prismaClient.user.create({ data: data });
  }

  async findOneByEmail(userEmail: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { email: userEmail }
    });

    return user;
  }
}

export default UsersRepository;
