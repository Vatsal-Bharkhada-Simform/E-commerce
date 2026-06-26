export function reduceStringToInteger(str: string) {
	let hashCode = 0;
	for (let i = 0; i < str.length; i++) {
		hashCode += str.charCodeAt(i);
	}
	return hashCode;
}
