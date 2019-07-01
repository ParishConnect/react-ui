import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CornerRightDownIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="corner-right-down" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="10 15 15 20 20 15" />
        <path d="M4 4h7a4 4 0 0 1 4 4v12" />
      </Icon>
    )
  }
}
