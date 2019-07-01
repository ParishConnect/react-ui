import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CornerUpRightIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="corner-up-right" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="15 14 20 9 15 4" />
        <path d="M4 20v-7a4 4 0 0 1 4-4h12" />
      </Icon>
    )
  }
}
