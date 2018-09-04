import * as React from "react";
import Box, { Props } from "aluminum-box";

export default class UnorderedList extends React.PureComponent<Props> {
	render() {
		return (
			<Box
				is="ul"
				margin={0}
				marginLeft="1.1em"
				padding={0}
				listStylePosition="inside"
				listStyle="disc"
				{...this.props}
			/>
		);
	}
}
