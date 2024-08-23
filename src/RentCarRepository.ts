import pgp from "pg-promise";
import Renting from "./Renting";

export default interface RentCarRepository {
  save(rent: Renting): Promise<void>;
  get(rentingId: string): Promise<Renting>;
}

export class RentCarRepositoryDatabase implements RentCarRepository {
  async save(renting: Renting): Promise<void> {
    const connection = pgp()("postgres://postgres:pass@localhost:5432/rent_car");
    await connection.query(
      "insert into renting (renting_id, car_id, email, pickup_date, return_date, duration, price, status) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        renting.rentingId,
        renting.carId,
        renting.email,
        renting.pickupDate,
        renting.returnDate,
        renting.getDuration(),
        renting.getPrice(),
        renting.getStatus(),
      ]
    );

    await connection.$pool.end();
  }

  async get(rentingId: string): Promise<Renting> {
    const connection = pgp()("postgres://postgres:pass@localhost:5432/rent_car");
    const [rentingRes] = await connection.query(
      "select * from renting where renting_id = $1",
      [rentingId]
    );
    await connection.$pool.end();

    return new Renting(
      rentingRes.renting_id,
      rentingRes.car_id,
      rentingRes.email,
      rentingRes.pickup_date,
      rentingRes.return_date,
      parseFloat(rentingRes.duration),
      parseFloat(rentingRes.price),
      rentingRes.status
    );
  }
}
