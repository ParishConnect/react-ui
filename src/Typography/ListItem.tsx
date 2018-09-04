import React from "react";
import Text, { TextProps } from "./Text";

export default class ListItem extends React.PureComponent<TextProps> {
	render() {
		return <Text is="li" marginTop="0.5em" marginBottom="0.5em" {...this.props} />;
	}
}
