import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CrosshairIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="crosshair" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <line x1="12" y1="22" x2="12" y2="18" />
      </Icon>
    )
  }
}
