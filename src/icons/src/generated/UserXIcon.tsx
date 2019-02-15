import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class UserXIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="user-x" viewBox="0 0 24 24" {...this.props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="18" y1="8" x2="23" y2="13" />
        <line x1="23" y1="8" x2="18" y2="13" />
      </Icon>
    )
  }
}
