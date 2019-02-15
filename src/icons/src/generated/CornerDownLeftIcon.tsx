import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CornerDownLeftIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="corner-down-left" viewBox="0 0 24 24" {...this.props}>
        <polyline points="9 10 4 15 9 20" />
        <path d="M20 4v7a4 4 0 0 1-4 4H4" />
      </Icon>
    )
  }
}
