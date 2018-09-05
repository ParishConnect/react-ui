import React from "react";
import { mapValues } from "lodash";
import TextStyles from "./styles/TextStyles";
import Text from "./Text";

export interface ParagraphProps {
	textStyles?: Object;
	textUppercaseStyles?: Object;
	[prop: string]: any;
}

const textStyleTransformation = ({ lineHeight = "10", ...textStyle }) => ({
	...textStyle,
	// Multiply line height by 1.1
	lineHeight: `${Math.round(parseFloat(lineHeight) * 1.08)}px`
});

const textStyles = mapValues(TextStyles, textStyleTransformation);

export default class Paragraph extends React.PureComponent<ParagraphProps> {
	render() {
		return <Text as="p" marginTop={0} marginBottom={0} textStyles={textStyles} {...this.props} />;
	}
}
