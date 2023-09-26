import { Rentals, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

import dayjs from 'dayjs';

function createRentalFactory(carId?: string, userId?: string): Rentals {
  const addTwoDays = dayjs().add(4, 'day').toDate();

  return {
    id: faker.datatype.uuid(),
    car_id: carId ? carId : faker.datatype.uuid(),
    user_id: userId || faker.datatype.uuid(),
    created_at: new Date(),
    end_date: null,
    expected_return_date: addTwoDays,
    start_date: new Date(),
    total: new Prisma.Decimal(faker.commerce.price()),
    updated_at: new Date()
  };
}

export default createRentalFactory;
