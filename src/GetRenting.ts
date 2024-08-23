import RentCarRepository from "./RentCarRepository";

type Output = {
  rentingId: string;
  carId: string;
  email: string;
  pickupDate: Date;
  returnDate: Date;
  duration: number;
  price: number;
  status: string;
};

export default class GetRenting {
  constructor(readonly rentCarRepository: RentCarRepository) {}

  async execute(rentingId: string): Promise<Output> {
    const renting = await this.rentCarRepository.get(rentingId);
    return {
      rentingId: renting.rentingId,
      carId: renting.carId,
      email: renting.email,
      pickupDate: renting.pickupDate,
      returnDate: renting.returnDate,
      duration: renting.getDuration(),
      price: renting.getPrice(),
      status: renting.getStatus(),
    };
  }
}
