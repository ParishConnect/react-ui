import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ClockIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="clock" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </Icon>
    )
  }
}
