import React from "react";
import Text, { TextProps } from "./Text";

export default class Code extends React.PureComponent<TextProps> {
	render() {
		return <Text as="code" fontFamily="mono" {...this.props} />;
	}
}
