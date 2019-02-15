import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class RotateCwIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="rotate-cw" viewBox="0 0 24 24" {...this.props}>
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </Icon>
    )
  }
}
