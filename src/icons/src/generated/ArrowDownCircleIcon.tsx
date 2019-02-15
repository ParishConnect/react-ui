import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ArrowDownCircleIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="arrow-down-circle" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="8 12 12 16 16 12" />
        <line x1="12" y1="8" x2="12" y2="16" />
      </Icon>
    )
  }
}
