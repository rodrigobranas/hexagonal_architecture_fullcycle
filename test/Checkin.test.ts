import Checkin from "../src/Checkin";
import Checkout from "../src/Checkout";
import GetParkedCars from "../src/GetParkedCars";
import ParkedCarDatabaseRepository from "../src/ParkedCarDatabaseRepository";
import ParkedCarMemoryRepository from "../src/ParkedCarMemoryRepository";
import PostgreSQLAdapter from "../src/PostgreSQLAdapter";

test("Deve fazer um checkin", async function () {
	const connection = new PostgreSQLAdapter();
	const parkedCarRepository = new ParkedCarDatabaseRepository(connection);
	// const parkedCarRepository = new ParkedCarMemoryRepository();
	const checkin = new Checkin(parkedCarRepository);
	const inputCheckin = {
		plate: "AAA-9999",
		checkinDate: "2022-03-01T10:00:00-03:00"
	}
	await checkin.execute(inputCheckin);
	const getParkedCars = new GetParkedCars(parkedCarRepository);
	const parkedCars = await getParkedCars.execute();
	expect(parkedCars).toHaveLength(1);
	const inputCheckout = {
		plate: "AAA-9999",
		checkoutDate: "2022-03-01T12:00:00-03:00"
	}
	const checkout = new Checkout(parkedCarRepository);
	const ticket = await checkout.execute(inputCheckout);
	expect(ticket.period).toBe(2);
	expect(ticket.price).toBe(20);
	await connection.close();
});
