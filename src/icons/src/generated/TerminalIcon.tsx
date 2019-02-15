import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class TerminalIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="terminal" viewBox="0 0 24 24" {...this.props}>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </Icon>
    )
  }
}
