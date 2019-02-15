import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ArrowUpCircleIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="arrow-up-circle" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="16 12 12 8 8 12" />
        <line x1="12" y1="16" x2="12" y2="8" />
      </Icon>
    )
  }
}
