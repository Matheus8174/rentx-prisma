import { faker } from '@faker-js/faker';

import RentalsRepository from '@modules/rentals/infra/prisma/repositories/RentalsRepository';
import createRentalFactory from '@tests/unit/helpers/createRentalFactory';
import ListRentalsByUserUseCase from './ListRentalsByUserUseCase';

let listRentalsByUserUseCase: ListRentalsByUserUseCase;

let rentalsRepository: RentalsRepository;

describe('#ListRentalsByUser', () => {
  beforeAll(() => {
    rentalsRepository = new RentalsRepository(global.prismaClientMocked);

    listRentalsByUserUseCase = new ListRentalsByUserUseCase(rentalsRepository);
  });

  it.skip('shoud be able to get all Rentals from an user', async () => {
    const userId = faker.datatype.uuid();

    const rentals = Array(2).map(() => createRentalFactory(undefined, userId));

    global.mockCtx.prisma.rentals.findMany.mockResolvedValue(rentals);

    jest.spyOn(rentalsRepository, 'findAllByUser').mockResolvedValue(rentals);

    // console.log();
    await listRentalsByUserUseCase.execute({ userId });

    // expect(listRentalsByUserUseCase.execute({ userId })).resolves.toContain(
    //   rentals[0]
    // );
  });
});
