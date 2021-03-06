import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class SendIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="send" viewBox="0 0 24 24" {...this.props as any}>
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </Icon>
    )
  }
}
