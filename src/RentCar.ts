import CarRepository from "./CarRepository";
import RentCarRepository from "./RentCarRepository";
import Renting from "./Renting";

type Input = {
  carId: string;
  email: string;
  pickupDate: Date;
  returnDate: Date;
};

type Output = {
  rentingId: string;
};

// Use Case
export default class RentCar {
  constructor(
    readonly carRepository: CarRepository,
    readonly rentCarRepository: RentCarRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const car = await this.carRepository.get(input.carId);
    
    const renting = Renting.create(
      input.carId,
      input.email,
      input.pickupDate,
      input.returnDate
    );
    
    renting.calculate(car);
    
    await this.rentCarRepository.save(renting);

    return { rentingId: renting.rentingId };
  }
}
