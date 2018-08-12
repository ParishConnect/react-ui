import colors from "../../colors";

const LayerAppearances = {
	ultralight: { backgroundColor: colors.neutral["3A"] },
	light: { backgroundColor: colors.neutral["5A"] },
	medium: { backgroundColor: colors.neutral["7A"] },

	dark: { backgroundColor: colors.neutral["800"] },

	selected: {
		backgroundColor: colors.blue["10A"],
		shadow: `inset 0 0 0 1px ${colors.blue["30A"]}`
	}
};

export default LayerAppearances;
