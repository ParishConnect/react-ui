export const numOrString = (props: any, param: string) => {
	if (typeof props[param] === "undefined") return "";
	return typeof props[param] === "string" ? props[param] : `${props[param]}px`;
};
