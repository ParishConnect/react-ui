import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ToggleRightIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="toggle-right" viewBox="0 0 24 24" {...this.props as any}>
        <rect x="1" y="5" width="22" height="14" rx="7" ry="7" />
        <circle cx="16" cy="12" r="3" />
      </Icon>
    )
  }
}
