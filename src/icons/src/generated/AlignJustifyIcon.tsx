import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class AlignJustifyIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="align-justify" viewBox="0 0 24 24" {...this.props as any}>
        <line x1="21" y1="10" x2="3" y2="10" />
        <line x1="21" y1="6" x2="3" y2="6" />
        <line x1="21" y1="14" x2="3" y2="14" />
        <line x1="21" y1="18" x2="3" y2="18" />
      </Icon>
    )
  }
}
