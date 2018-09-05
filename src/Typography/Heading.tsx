import React from "react";
import { mapValues } from "lodash";
import TextStyles from "./styles/TextStyles";
import Text, { TextProps } from "./Text";

const textStyleTransformation = ({ fontWeight, ...textStyle }: any) => ({
	...textStyle,
	fontWeight: fontWeight + 100
});

const textStyles = mapValues(TextStyles, textStyleTransformation);

export default class Heading extends React.PureComponent<TextProps> {
	render() {
		return (
			<Text
				as="h2"
				color="dark"
				fontFamily="display"
				marginTop={0}
				marginBottom={0}
				textStyles={textStyles}
				{...this.props}
			/>
		);
	}
}
