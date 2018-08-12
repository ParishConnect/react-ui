import colors from "../../colors";

const LayerAppearances = {
	ultralight: { backgroundColor: colors.neutral["3A"] },
	light: { backgroundColor: colors.neutral["5A"] },
	medium: { backgroundColor: colors.neutral["7A"] },

	blue: {
		background: `linear-gradient(-45deg, ${colors.blue["300"]}, ${colors.turquoise["300"]} )`,
		shadowColor: "blue"
	},
	red: {
		background: `linear-gradient(-45deg, ${colors.pink["400"]}, ${colors.red["200"]} )`,
		shadowColor: "red"
	},
	purple: {
		background: `linear-gradient(-45deg, ${colors.purple["700"]}, ${colors.pink["300"]} )`,
		shadowColor: "purple"
	},
	yellow: {
		background: `linear-gradient(-45deg, ${colors.yellow["800"]}, ${colors.yellow["300"]} )`,
		shadowColor: "yellow"
	},

	dark: { backgroundColor: colors.neutral["800"] },

	selected: {
		backgroundColor: colors.blue["10A"],
		shadow: `inset 0 0 0 1px ${colors.blue["30A"]}`,
		border: "none"
	}
};

export default LayerAppearances;
