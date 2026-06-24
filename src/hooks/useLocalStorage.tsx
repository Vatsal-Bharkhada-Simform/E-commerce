import { useEffect, useState } from "react";

export function useLocalStorage<T>(store: string, defaultValue: T) {
	const [data, setData] = useState<T>(() =>
		fetchData<T>(store, defaultValue)
	);

	useEffect(() => {
		localStorage.setItem(store, JSON.stringify(data));
	}, [store, data]);

	return [data, setData] as const;
}

function fetchData<T>(store: string, defaultValue: T) {
	const data = localStorage.getItem(store);
	if (data === null) {
		return defaultValue;
	}
	let parsedData: T;
	try {
		parsedData = JSON.parse(data) as T;
	} catch (err) {
		console.log(err);
		parsedData = defaultValue;
	}
	return parsedData;
}
