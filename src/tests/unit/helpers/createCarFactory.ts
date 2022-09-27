import { Car, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

function createCarFactory(): Car {
  return {
    id: faker.datatype.uuid(),
    name: faker.vehicle.vehicle(),
    brand: faker.vehicle.manufacturer(),
    daily_rate: new Prisma.Decimal(faker.commerce.price()),
    description: faker.lorem.lines(1),
    license_plate: faker.vehicle.vrm(),
    category_id: faker.datatype.uuid(),
    fine_amount: new Prisma.Decimal(faker.commerce.price()),
    created_at: new Date(),
    available: true
  };
}

export default createCarFactory;
