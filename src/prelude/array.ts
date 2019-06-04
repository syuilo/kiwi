/**
 * Concatenate an array of arrays
 */
export function concat<T>(xss: T[][]): T[] {
	return ([] as T[]).concat(...xss);
}

/**
 * Intersperse the element between the elements of the array
 * @param sep The element to be interspersed
 * @param xs
 */
export function intersperse<T>(sep: T, xs: T[]): T[] {
	return concat(xs.map(x => [sep, x])).slice(1);
}

/**
 * Returns the array of elements that is not equal to the element
 */
export function erase<T>(a: T, xs: T[]): T[] {
	return xs.filter(x => x !== a);
}

/**
 * Finds the array of all elements in the first array not contained in the second array.
 * The order of result values are determined by the first array.
 */
export function difference<T>(xs: T[], ys: T[]): T[] {
	return xs.filter(x => !ys.includes(x));
}

/**
 * Remove all but the first element from every group of equivalent elements
 */
export function unique<T>(xs: T[]): T[] {
	return [...new Set(xs)];
}

export function sum(xs: number[]): number {
	return xs.reduce((a, b) => a + b, 0);
}

export function maximum(xs: number[]): number {
	return Math.max(...xs);
}

/**
 * Compare two arrays by lexicographical order
 */
export function lessThan(xs: number[], ys: number[]): boolean {
	for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
		if (xs[i] < ys[i]) return true;
		if (xs[i] > ys[i]) return false;
	}
	return xs.length < ys.length;
}

export function cumulativeSum(xs: number[]): number[] {
	const ys = Array.from(xs); // deep copy
	for (let i = 1; i < ys.length; i++) ys[i] += ys[i - 1];
	return ys;
}

// Object.fromEntries()
export function fromEntries(xs: [string, any][]): { [x: string]: any; } {
	return xs.reduce((obj, [k, v]) => Object.assign(obj, { [k]: v }), {} as { [x: string]: any; });
}
