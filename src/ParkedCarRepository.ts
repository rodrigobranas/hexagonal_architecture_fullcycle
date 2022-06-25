import ParkedCar from "./ParkedCar";

export default interface ParkedCarRepository {
	save (parkedCar: ParkedCar): Promise<void>;
	update (parkedCar: ParkedCar): Promise<void>;
	list (): Promise<ParkedCar[]>;
	get (plate: string): Promise<ParkedCar>;
}
