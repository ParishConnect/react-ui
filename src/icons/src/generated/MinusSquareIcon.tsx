import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class MinusSquareIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="minus-square" viewBox="0 0 24 24" {...this.props as any}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </Icon>
    )
  }
}
