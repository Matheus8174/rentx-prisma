import { User } from '.prisma/client';
import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findOneByEmail(userEmail: string): Promise<User | null>;
}

export default IUsersRepository;
