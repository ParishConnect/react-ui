import React from "react";
import Text, { TextProps } from "./Text";

export default class Code extends React.PureComponent<TextProps> {
	render() {
		return <Text is="code" fontFamily="mono" {...this.props} />;
	}
}
