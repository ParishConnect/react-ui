import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class UserPlusIcon extends PureComponent {
  render() {
    return (
      <Icon name="user-plus" viewBox="0 0 24 24" {...this.props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </Icon>
    )
  }
}