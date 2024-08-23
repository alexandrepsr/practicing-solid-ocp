/**
 * SOLID - Using Open/Closed Principle
 */
export default interface PriceCalculator {
  calculate(
    pickupDate: Date,
    returnDate: Date,
    carPrice: number
  ): { duration: number; price: number };
}

export class DayPriceCalculator implements PriceCalculator {
  calculate(
    pickupDate: Date,
    returnDate: Date,
    carPrice: number
  ): { duration: number; price: number } {
    const duration =
      (returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24);

    const price = duration * carPrice;

    return { duration, price };
  }
}

export class HourPriceCalculator implements PriceCalculator {
  calculate(
    pickupDate: Date,
    returnDate: Date,
    carPrice: number
  ): { duration: number; price: number } {
    const duration =
      (returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60);

    const price = duration * carPrice;

    return { duration, price };
  }
}

export class PriceCalculatorFactor {
  static create(type: string) {
    if (type == "day") {
      return new DayPriceCalculator();
    } else if (type == "hour") {
      return new HourPriceCalculator();
    } else {
      throw new Error();
    }
  }
}
