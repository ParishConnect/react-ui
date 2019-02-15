import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CornerLeftUpIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="corner-left-up" viewBox="0 0 24 24" {...this.props}>
        <polyline points="14 9 9 4 4 9" />
        <path d="M20 20h-7a4 4 0 0 1-4-4V4" />
      </Icon>
    )
  }
}
