import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class MinusCircleIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="minus-circle" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </Icon>
    )
  }
}
