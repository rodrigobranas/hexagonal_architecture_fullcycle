import ParkedCar from "../src/ParkedCar"

test("Deve fazer um checkout", function () {
	const parkedCar = new ParkedCar("AAA-9999", new Date("2022-03-01T10:00:00"));
	parkedCar.checkout("2022-03-01T12:00:00");
	expect(parkedCar.price).toBe(20);
	expect(parkedCar.diff).toBe(2);
});
