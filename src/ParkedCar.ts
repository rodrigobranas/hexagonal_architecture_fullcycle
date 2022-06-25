export default class ParkedCar {
	diff?: number;
	price?: number;

	constructor (readonly plate: string, readonly checkinDate: Date, public checkoutDate?: Date) {
	}

	checkout (checkoutDate: string) {
		const checkinDate = new Date(this.checkinDate);
		this.diff = (new Date(checkoutDate).getTime() - checkinDate.getTime())/(1000*60*60);
		this.price = this.diff * 10;
	}
}
