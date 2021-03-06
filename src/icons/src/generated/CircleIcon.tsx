import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CircleIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="circle" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="12" cy="12" r="10" />
      </Icon>
    )
  }
}
