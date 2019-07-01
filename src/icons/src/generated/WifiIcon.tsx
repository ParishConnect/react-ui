import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class WifiIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="wifi" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12" y2="20" />
      </Icon>
    )
  }
}
