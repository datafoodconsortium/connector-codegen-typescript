import Localizable from "./Localizable.js"


export default class Address implements Localizable {

	private street: string;
	private postalCode: string;
	private city: string;
	private country: string;

	constructor(street: string, postalCode: string, city: string, country: string) {
		
		this.street = street;
		this.postalCode = postalCode;
		this.city = city;
		this.country = country;
		
	}

	setCity(city: string): void {
		this.city = city;
	}

	setCountry(country: string): void {
		this.country = country;
	}

	getStreet(): string {
		return this.street;
	}

	getPostalCode(): string {
		return this.postalCode;
	}

	getCity(): string {
		return this.city;
	}

	setPostalCode(postalCode: string): void {
		this.postalCode = postalCode;
	}

	getCountry(): string {
		return this.country;
	}

	setStreet(street: string): void {
		this.street = street;
	}

}
