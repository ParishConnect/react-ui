import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CheckCircleIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="check-circle" viewBox="0 0 24 24" {...this.props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </Icon>
    )
  }
}
