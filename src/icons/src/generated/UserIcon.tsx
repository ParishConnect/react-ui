import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class UserIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="user" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </Icon>
    )
  }
}
