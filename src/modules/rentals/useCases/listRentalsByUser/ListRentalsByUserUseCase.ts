import { inject, injectable } from 'tsyringe';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository
  ) {}

  public async execute({ userId }: IRequest) {
    const rentals = await this.rentalsRepository.findAllByUser(userId);

    console.log(rentals[0]);

    return rentals;
  }
}

export default ListRentalsByUserUseCase;
