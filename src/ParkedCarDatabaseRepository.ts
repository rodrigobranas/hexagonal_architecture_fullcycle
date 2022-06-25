import ParkedCar from "./ParkedCar";
import ParkedCarRepository from "./ParkedCarRepository";
import Connection from "./Connection";

export default class ParkedCarDatabaseRepository implements ParkedCarRepository {

	constructor (readonly connection: Connection) {
	}

	async save(parkedCar: ParkedCar): Promise<void> {
		await this.connection.query("insert into branas.parked_car (plate, checkin_date) values  ($1, $2)", [parkedCar.plate, parkedCar.checkinDate]);
	}

	async update(parkedCar: ParkedCar): Promise<void> {
		await this.connection.query("update branas.parked_car set checkout_date = now() where plate = $1", [parkedCar.plate]);
	}

	async list(): Promise<ParkedCar[]> {
		const parkedCarsData = await this.connection.query("select * from branas.parked_car where checkout_date is null", []);
		const parkedCars: ParkedCar[] = [];
		for (const parkedCarData of parkedCarsData) {
			const parkedCar = new ParkedCar(parkedCarData.plate, new Date(parkedCarData.checkin_date));
			parkedCars.push(parkedCar);
		}
		return parkedCars;
	}

	async get(plate: string): Promise<ParkedCar> {
		const parkedCarData = await this.connection.one("select * from branas.parked_car where plate = $1 and checkout_date is null", [plate]);
		const parkedCar = new ParkedCar(parkedCarData.plate, new Date(parkedCarData.checkin_date));
		return parkedCar;
	}

}