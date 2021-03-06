import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ZoomInIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="zoom-in" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </Icon>
    )
  }
}
