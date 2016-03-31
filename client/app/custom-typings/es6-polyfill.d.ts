declare type PropertyKey = string | number | symbol;

interface IterableShim<T> {
	/**
	 * Shim for an ES6 iterable. Not intended for direct use by user code.
	 */
	"_es6-shim iterator_"(): Iterator<T>;
}

interface Iterator<T> {
	next(value?: any): IteratorResult<T>;
	return?(value?: any): IteratorResult<T>;
	throw?(e?: any): IteratorResult<T>;
}

interface IterableIteratorShim<T> extends IterableShim<T>, Iterator<T> {
	/**
	 * Shim for an ES6 iterable iterator. Not intended for direct use by user code.
	 */
	"_es6-shim iterator_"(): IterableIteratorShim<T>;
}

interface Array<T> {
	/**
	 * Returns the value of the first element in the array where predicate is true, and undefined
	 * otherwise.
	 * @param predicate find calls predicate once for each element of the array, in ascending
	 * order, until it finds one where predicate returns true. If such an element is found, find
	 * immediately returns that element value. Otherwise, find returns undefined.
	 * @param thisArg If provided, it will be used as the this value for each invocation of
	 * predicate. If it is not provided, undefined is used instead.
	 */
	find(predicate: (value: T, index: number, obj: Array<T>) => boolean, thisArg?: any): T;

	/**
	 * Returns the index of the first element in the array where predicate is true, and undefined
	 * otherwise.
	 * @param predicate find calls predicate once for each element of the array, in ascending
	 * order, until it finds one where predicate returns true. If such an element is found, find
	 * immediately returns that element value. Otherwise, find returns undefined.
	 * @param thisArg If provided, it will be used as the this value for each invocation of
	 * predicate. If it is not provided, undefined is used instead.
	 */
	findIndex(predicate: (value: T) => boolean, thisArg?: any): number;

	/**
	 * Returns the this object after filling the section identified by start and end with value
	 * @param value value to fill array section with
	 * @param start index to start filling the array at. If start is negative, it is treated as
	 * length+start where length is the length of the array.
	 * @param end index to stop filling the array at. If end is negative, it is treated as
	 * length+end.
	 */
	fill(value: T, start?: number, end?: number): T[];

	/**
	 * Returns the this object after copying a section of the array identified by start and end
	 * to the same array starting at position target
	 * @param target If target is negative, it is treated as length+target where length is the
	 * length of the array.
	 * @param start If start is negative, it is treated as length+start. If end is negative, it
	 * is treated as length+end.
	 * @param end If not specified, length of the this object is used as its default value.
	 */
	copyWithin(target: number, start: number, end?: number): T[];

	/**
	 * Returns an array of key, value pairs for every entry in the array
	 */
	entries(): IterableIteratorShim<[number, T]>;

	/**
	 * Returns an list of keys in the array
	 */
	keys(): IterableIteratorShim<number>;

	/**
	 * Returns an list of values in the array
	 */
	values(): IterableIteratorShim<T>;

	/**
	 * Shim for an ES6 iterable. Not intended for direct use by user code.
	 */
	"_es6-shim iterator_"(): IterableIteratorShim<T>;
}

