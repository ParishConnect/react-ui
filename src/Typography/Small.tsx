import React from "react";
import { mapValues } from "lodash";
import TextStyles from "./styles/TextStyles";
import Text, { TextProps } from "./Text";

const textStyleTransformation = ({ fontSize, ...textStyle }: any) => ({
	...textStyle,
	fontSize: `${Math.round(parseInt(fontSize, 10) * 0.8)}px`
});

export default class Small extends React.PureComponent<TextProps> {
	render() {
		const textStyles = mapValues(TextStyles, textStyleTransformation);
		console.log(textStyles);

		return <Text as="small" textStyles={textStyles} {...this.props} />;
	}
}
