import React from "react";
import styled from "styled-components";
import LinkAppearances from "./styles/LinkAppearances";
import Text, { TextProps } from "./Text";

export interface LinkProps extends TextProps {
	rel?: string;
	href?: string;
	target?: string;
	appearance?: string;
}

export default class Link extends React.PureComponent<LinkProps> {
	static defaultProps = {
		appearance: "blue",
		is: "a"
	};
	render() {
		return <_Text is={this.props.is} fontFamily="display" marginTop={0} marginBottom={0} {...this.props} />;
	}
}

const _Text = styled(Text)<any>`
	${props => LinkAppearances[props.appearance]};
`;
