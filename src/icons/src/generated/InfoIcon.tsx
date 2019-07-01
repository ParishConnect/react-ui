import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class InfoIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="info" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="8" />
      </Icon>
    )
  }
}
