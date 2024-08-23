import { CarRepositoryDatabase } from "../src/CarRepository";
import GetRenting from "../src/GetRenting";
import RentCar from "../src/RentCar";
import { RentCarRepositoryDatabase } from "../src/RentCarRepository";

test("should be able to rent a car per day", async () => {
  const carRepository = new CarRepositoryDatabase();
  const rentCarRepository = new RentCarRepositoryDatabase();
  const rentCar = new RentCar(carRepository, rentCarRepository);

  const inputRentCar = {
    carId: "8c0a59f4-64cb-436e-81c1-ae92f3c7be20",
    email: "bob@gangof4.com",
    pickupDate: new Date("2024-02-02T12:00:00"),
    returnDate: new Date("2024-02-10T12:00:00"),
  };

  const resultRentCar = await rentCar.execute(inputRentCar);

  expect(resultRentCar.rentingId).toBeDefined();

  const getRenting = new GetRenting(rentCarRepository);
  const resultRenting = await getRenting.execute(resultRentCar.rentingId);
  expect(resultRenting.email).toBe(inputRentCar.email);
  expect(resultRenting.duration).toBeCloseTo(8);
  expect(resultRenting.price).toBe(800);
  expect(resultRenting.status).toBe("active");
});

test("should be able to rent a car by the hour", async () => {

})