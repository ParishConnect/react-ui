import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class UnlockIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="unlock" viewBox="0 0 24 24" {...this.props as any}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </Icon>
    )
  }
}
