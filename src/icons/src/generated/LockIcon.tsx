import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class LockIcon extends PureComponent {
  render() {
    return (
      <Icon name="lock" viewBox="0 0 24 24" {...this.props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </Icon>
    )
  }
}
