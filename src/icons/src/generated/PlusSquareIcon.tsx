import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class PlusSquareIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="plus-square" viewBox="0 0 24 24" {...this.props as any}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </Icon>
    )
  }
}
