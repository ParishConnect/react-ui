import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ZoomOutIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="zoom-out" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </Icon>
    )
  }
}
