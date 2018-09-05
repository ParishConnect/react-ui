import React from "react";
import Text, { TextProps } from "./Text";

export default class Pre extends React.PureComponent<TextProps> {
	render() {
		return <Text as="pre" marginTop={0} marginBottom={0} {...this.props} />;
	}
}
