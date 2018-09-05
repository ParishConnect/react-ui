import React from "react";
import Text, { TextProps } from "./Text";

export default class Label extends React.PureComponent<TextProps> {
	render() {
		return <Text as="label" {...this.props} />;
	}
}
