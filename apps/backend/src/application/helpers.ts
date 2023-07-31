export const capitalizeFirstLetters = (sentence: string): string => {
	return sentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => {
		return letter.toUpperCase();
	});
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const partition = (array: any[], isValid: (elem: any) => boolean) => {
	return array.reduce(
		([pass, fail], elem) => {
			return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
		},
		[[], []],
	);
};

export const removeFalsyFromObject = (value: object) => {
	const res = Object.fromEntries(
		Object.entries(value)
			.filter(([, v]) => {
				return v !== null && v !== undefined && v !== '';
			})
			.map(([k, v]) => {
				return [k, Number.isNaN(+v) ? v : +v];
			}),
	);
	return res;
};
