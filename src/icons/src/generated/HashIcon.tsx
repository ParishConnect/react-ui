import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class HashIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="hash" viewBox="0 0 24 24" {...this.props as any}>
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="10" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="14" y2="21" />
      </Icon>
    )
  }
}
