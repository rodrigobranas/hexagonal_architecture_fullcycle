import pgp from "pg-promise";
import ParkedCarRepository from "./ParkedCarRepository";

export default class GetParkedCars {

	constructor (readonly parkedCarRepository: ParkedCarRepository) {
	}

	async execute (): Promise<Output[]> {
		const parkedCars = await this.parkedCarRepository.list();
		return parkedCars;
	}
}

type Output = {
	plate: string,
	checkinDate: Date
}