import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class ArrowRightCircleIcon extends PureComponent {
  render() {
    return (
      <Icon name="arrow-right-circle" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 16 16 12 12 8" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </Icon>
    )
  }
}
