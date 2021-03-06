import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class MessageSquareIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="message-square" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </Icon>
    )
  }
}
