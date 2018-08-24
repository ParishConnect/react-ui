import colors from "../../colors";
import { css } from "styled-components";

const LinkAppearances = {
	blue: css`
		color: ${colors.blue["500"]};
		text-decoration: none;

		&:hover: {
			color: ${colors.blue["300"]};
			text-decoration: underline;
		}
		&:active: {
			color: ${colors.blue["900"]};
			text-decoration: none;
		}
		&:focus: {
			box-shadow: 0 0 0 2px ${colors.blue["100A"]};
		}
	`,
	green: css`
		color: ${colors.green["500"]};
		text-decoration: none;
		&:hover: {
			color: ${colors.green["300"]};
			text-decoration: underline;
		}
		&:active: {
			color: ${colors.green["900"]};
			text-decoration: none;
		}
		&:focus: {
			box-shadow: 0 0 0 2px ${colors.green["100A"]};
		}
	`,
	neutral: css`
		color: ${colors.neutral["500"]};
		text-decoration: none;
		&:hover: {
			color: ${colors.neutral["300"]};
			text-decoration: underline;
		}
		&:active: {
			color: ${colors.neutral["900"]};
			text-decoration: none;
		}
		&:focus: {
			box-shadow: 0 0 0 2px ${colors.neutral["100A"]};
		}
	`
};

export default LinkAppearances;
