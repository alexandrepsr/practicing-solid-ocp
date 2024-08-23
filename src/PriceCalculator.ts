/**
 * SOLID - Using Open/Closed Principle
 * Template Method Pattern
 */
export default abstract class PriceCalculator {
  calculate(
    pickupDate: Date,
    returnDate: Date,
    carPrice: number
  ): { duration: number; price: number } {
    const duration = this.calculateDuration(pickupDate, returnDate);
    const price = duration * carPrice;
    return { duration, price };
  }

  abstract calculateDuration(pickupDate: Date, returnDate: Date): number;
}

export class DayPriceCalculator extends PriceCalculator {
  calculateDuration(pickupDate: Date, returnDate: Date): number {
    return (
      (returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
}

export class HourPriceCalculator extends PriceCalculator {
  calculateDuration(pickupDate: Date, returnDate: Date): number {
    return (returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60);
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
