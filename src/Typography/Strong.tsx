import React from "react";
import Text, { TextProps } from "./Text";

export default class Strong extends React.PureComponent<TextProps> {
	render() {
		return <Text as="strong" fontWeight={600} {...this.props} />;
	}
}
