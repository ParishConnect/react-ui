import * as React from "react";
import { Size, FontFamily } from "../utils/enum";
import FontFamilies from "./styles/FontFamilies";
import TextColors from "./styles/TextColors";
import TextStyles from "./styles/TextStyles";
import TextUppercaseStyles from "./styles/TextUppercaseStyles";
import Box from "aluminum-box";

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

export interface TextProps {
	extend?: any;
	is?: string;
	size?: Size | string | number;
	fontFamily?: FontFamily | string;
	color?: string;
	isUppercase?: Boolean;
	textStyles?: Object;
	textUppercaseStyles?: Object;
	[prop: string]: any;
}

export default class Text extends React.PureComponent<TextProps> {
	static defaultProps = {
		element: "span",
		size: 500,
		color: "default",
		fontFamily: "ui",
		textStyles: TextStyles,
		textUppercaseStyles: TextUppercaseStyles,
		isUppercase: false
	};

	render() {
		const {
			is = "span",
			size = 500,
			color = "default",
			fontFamily = "ui",
			textStyles,
			textUppercaseStyles = false,
			isUppercase,
			...props
		} = this.props;

		let textStyle = TextStyles[size];

		if (isUppercase) {
			//Only 100 & 200 support uppercase styles
			if (Object.prototype.hasOwnProperty.call(textUppercaseStyles, size)) {
				textStyle = textUppercaseStyles[size];
			} else if (isDev) {
				console.error(
					`Uppercase ${size} is not supported <Text isUppercase> only supports the following sizes: ${JSON.stringify(
						Object.keys(textUppercaseStyles).map(Number)
					)}`
				);
			}
		}

		return (
			<Box
				is={is}
				{...(color ? { color: TextColors[color] || color } : {})}
				fontFamily={FontFamilies[fontFamily] || fontFamily}
				{...textStyle}
				{...props}
			/>
		);
	}
}
