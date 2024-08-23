import crypto from "crypto";
import Car from "./Car";

export default class Renting {
  constructor(
    readonly rentingId: string,
    readonly carId: string,
    readonly email: string,
    readonly pickupDate: Date,
    readonly returnDate: Date,
    private duration: number,
    private price: number,
    private status: string
  ) {}

  // Static Factory
  static create(
    carId: string,
    email: string,
    pickupDate: Date,
    returnDate: Date
  ) {
    const rentingId = crypto.randomUUID();
    const duration = 0;
    const price = 0;
    const status = "active";

    return new Renting(
      rentingId,
      carId,
      email,
      pickupDate,
      returnDate,
      duration,
      price,
      status
    );
  }

  calculate(car: Car) {
    this.duration =
      (this.returnDate.getTime() - this.pickupDate.getTime()) /
      (1000 * 60 * 60 * 24);

    this.price = this.duration * car.price;
  }

  getStatus(): string {
    return this.status;
  }

  getDuration(): number {
    return this.duration;
  }

  getPrice(): number {
    return this.price;
  }
}
