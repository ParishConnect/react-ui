import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CheckSquareIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="check-square" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </Icon>
    )
  }
}
