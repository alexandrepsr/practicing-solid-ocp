import crypto from "crypto";
import Car from "./Car";
import { PriceCalculatorFactor } from "./PriceCalculator";

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

  // open/closed principle
  calculate(car: Car) {
    const { duration, price } = PriceCalculatorFactor.create(
      car.type
    ).calculate(this.pickupDate, this.returnDate, car.price);

    this.duration = duration;
    this.price = price;
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
