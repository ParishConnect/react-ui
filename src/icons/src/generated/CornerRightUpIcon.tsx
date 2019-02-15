import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CornerRightUpIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="corner-right-up" viewBox="0 0 24 24" {...this.props}>
        <polyline points="10 9 15 4 20 9" />
        <path d="M4 20h7a4 4 0 0 0 4-4V4" />
      </Icon>
    )
  }
}
