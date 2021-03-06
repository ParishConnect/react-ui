import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ShuffleIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="shuffle" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </Icon>
    )
  }
}
