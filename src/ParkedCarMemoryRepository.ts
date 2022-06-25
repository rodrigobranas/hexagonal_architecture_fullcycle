import ParkedCar from "./ParkedCar";
import ParkedCarRepository from "./ParkedCarRepository";

export default class ParkedCarMemoryRepository implements ParkedCarRepository {
	parkedCars: ParkedCar[];

	constructor () {
		this.parkedCars = [];
	}

	async save(parkedCar: ParkedCar): Promise<void> {
		this.parkedCars.push(parkedCar);
	}

	async update(parkedCar: ParkedCar): Promise<void> {
		const existingParkedCar = await this.get(parkedCar.plate);
		existingParkedCar.checkoutDate = parkedCar.checkoutDate;
	}

	async list(): Promise<ParkedCar[]> {
		return this.parkedCars.filter(parkedCar => parkedCar.checkoutDate === undefined);
	}

	async get(plate: string): Promise<ParkedCar> {
		const parkedCar = this.parkedCars.find(parkedCar => parkedCar.plate === plate);
		if (!parkedCar) throw new Error();
		return parkedCar;
	}
}
