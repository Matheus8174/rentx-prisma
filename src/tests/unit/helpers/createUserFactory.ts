import { hash } from 'bcrypt';
import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

type Props = {
  email: string;
  password: string;
};

async function createUserFactory(props: Props): Promise<User> {
  const passswordHashed = await hash(props.password, 8);

  return {
    password: passswordHashed,
    id: faker.datatype.uuid(),
    driver_license: faker.lorem.text(),
    email: props.email,
    name: faker.name.firstName(),
    avatar: faker.image.imageUrl(),
    created_at: new Date(),
    isAdmin: false
  };
}

export default createUserFactory;
