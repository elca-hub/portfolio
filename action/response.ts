export class PFResponse<T> {
	item?: T
	error?: Error

	constructor(item?: T, error?: Error) {
		this.item = item
		this.error = error
	}

	static success<T>(item: T): PFResponse<T> {
		return new PFResponse<T>(item)
	}

	static error(error: Error): PFResponse<never> {
		return new PFResponse<never>(undefined, error)
	}
}
