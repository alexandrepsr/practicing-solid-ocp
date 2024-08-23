import Car from "./Car";
import pgp from "pg-promise";

export default interface CarRepository {
  get(carId: string): Promise<Car>;
}

export class CarRepositoryDatabase implements CarRepository {
  async get(carId: string): Promise<Car> {
    const connection = pgp()("postgres://postgres:pass@localhost:5432/rent_car");
    const [carRes] = await connection.query(
      "select * from car where car_id = $1",
      [carId]
    );
    await connection.$pool.end();

    return new Car(carRes.car_id, carRes.model, carRes.type, parseFloat(carRes.price));
  }
}