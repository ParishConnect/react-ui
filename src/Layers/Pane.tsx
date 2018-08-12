import * as React from "react";
import styled from "styled-components";
import { numOrString } from "../utils/typeSwitch";
import { Appearance, Border } from "../utils/enum";
import Box from "aluminum-box";
import LayerAppearances from "./styles/appearances";
import ElevationStyles from "./styles/elevations-styles";
import BorderColors from "./styles/border-colors";

export interface PaneProps {
	appearance?: Appearance | string;
	border?: Border;
	elevation?: number;
	hoverElevation?: number;
	activeElevation?: number;
	borderTop?: string | boolean;
	borderRight?: string | boolean;
	borderBottom?: string | boolean;
	borderLeft?: string | boolean;
	[prop: string]: any;
}

export default class Pane extends React.PureComponent<PaneProps> {
	render() {
		const {
			appearance,

			elevation,
			hoverElevation,
			activeElevation,

			border = "default",
			borderTop,
			borderRight,
			borderBottom,
			borderLeft,
			...props
		} = this.props;

		let appearanceStyle = {};
		if (Object.prototype.hasOwnProperty.call(LayerAppearances, appearance)) {
			appearanceStyle = appearance && LayerAppearances[appearance];
		}

		let elevationStyle;
		if (elevation) {
			elevationStyle = ElevationStyles[elevation];
		}

		const [_borderTop, _borderRight, _borderBottom, _borderLeft] = [
			borderTop,
			borderRight,
			borderBottom,
			borderLeft
		].map(borderSideProperty => {
			if (Object.prototype.hasOwnProperty.call(BorderColors, borderSideProperty)) {
				return `1px solid ${borderSideProperty &&
					typeof borderSideProperty !== "boolean" &&
					BorderColors[borderSideProperty]}`;
			} else if (borderSideProperty === true) {
				// Use default, which is now muted, border color when explicitly a true boolean
				return `1px solid ${BorderColors.muted}`;
			} else if (Object.prototype.hasOwnProperty.call(BorderColors, border)) {
				return `1px solid ${border && BorderColors[border]}`;
			} else if (typeof border === "boolean") {
				return `1px solid ${BorderColors.muted}`;
			}

			return borderSideProperty;
		});

		return (
			<_Box
				borderTop={_borderTop}
				borderRight={_borderRight}
				borderBottom={_borderBottom}
				borderLeft={_borderLeft}
				shadow={elevationStyle}
				hoverElevation={hoverElevation}
				activeElevation={activeElevation}
				{...appearanceStyle}
				{...props}
			/>
		);
	}
}

const _Box = Box.extend<any>`
	${props =>
		props.hoverElevation &&
		`
	transition-duration: 150ms;
	transition-property: box-shadow, transform;
	transition-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);

	&:hover {
		transform: translateY(-2px);
		box-shadow: ${ElevationStyles[props.hoverElevation]}
	}
	`};

	${props =>
		props.activeElevation &&
		` &:active {
			transform: translateY(-1px);
			box-shadow: ${ElevationStyles[props.activeElevation]}
		}
	`};
`;
