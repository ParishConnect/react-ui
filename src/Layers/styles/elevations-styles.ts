import colors from "../../colors";

const borderShadowColor = colors.neutral["80A"];
const blurryShadowColor = colors.neutral["50A"];

const borderShadowBlue = colors.blue["80A"];
const blurryShadowBlue = colors.blue["50A"];

const borderShadowRed = colors.pink["80A"];
const blurryShadowRed = colors.pink["50A"];

const borderShadowPurple = colors.purple["125A"];
const blurryShadowPurple = colors.purple["200A"];

const borderShadowYellow = colors.yellow["200A"];
const blurryShadowYellow = colors.yellow["125A"];

const ElevationStyles = {
	default: [
		`0 0 1px ${borderShadowColor}`,
		`0 0 1px ${borderShadowColor}, 0 2px 4px -2px ${blurryShadowColor}`,
		`0 0 1px ${borderShadowColor}, 0 5px 8px -4px ${blurryShadowColor}`,
		`0 0 1px ${borderShadowColor}, 0 8px 10px -4px ${blurryShadowColor}`,
		`0 0 1px ${borderShadowColor}, 0 16px 24px -8px ${blurryShadowColor}`
	],
	blue: [
		`0 0 1px ${borderShadowBlue}`,
		`0 0 1px ${borderShadowBlue}, 0 2px 4px -2px ${blurryShadowBlue}`,
		`0 0 1px ${borderShadowBlue}, 0 5px 8px -4px ${blurryShadowBlue}`,
		`0 0 1px ${borderShadowBlue}, 0 8px 10px -4px ${blurryShadowBlue}`,
		`0 0 1px ${borderShadowBlue}, 0 16px 24px -8px ${blurryShadowBlue}`
	],
	red: [
		`0 0 1px ${borderShadowRed}`,
		`0 0 1px ${borderShadowRed}, 0 2px 4px -2px ${blurryShadowRed}`,
		`0 0 1px ${borderShadowRed}, 0 5px 8px -4px ${blurryShadowRed}`,
		`0 0 1px ${borderShadowRed}, 0 8px 10px -4px ${blurryShadowRed}`,
		`0 0 1px ${borderShadowRed}, 0 16px 24px -8px ${blurryShadowRed}`
	],
	purple: [
		`0 0 1px ${borderShadowPurple}`,
		`0 0 1px ${borderShadowPurple}, 0 2px 4px -2px ${blurryShadowPurple}`,
		`0 0 1px ${borderShadowPurple}, 0 5px 8px -4px ${blurryShadowPurple}`,
		`0 0 1px ${borderShadowPurple}, 0 8px 10px -4px ${blurryShadowPurple}`,
		`0 0 1px ${borderShadowPurple}, 0 16px 24px -8px ${blurryShadowPurple}`
	],
	yellow: [
		`0 0 1px ${borderShadowYellow}`,
		`0 0 1px ${borderShadowYellow}, 0 2px 4px -2px ${blurryShadowYellow}`,
		`0 0 1px ${borderShadowYellow}, 0 5px 8px -4px ${blurryShadowYellow}`,
		`0 0 1px ${borderShadowYellow}, 0 8px 10px -4px ${blurryShadowYellow}`,
		`0 0 1px ${borderShadowYellow}, 0 16px 24px -8px ${blurryShadowYellow}`
	]
};

export default ElevationStyles;
