import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CornerLeftDownIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="corner-left-down" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="14 15 9 20 4 15" />
        <path d="M20 4h-7a4 4 0 0 0-4 4v12" />
      </Icon>
    )
  }
}
