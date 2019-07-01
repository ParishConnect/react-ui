import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CommandIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="command" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
      </Icon>
    )
  }
}
