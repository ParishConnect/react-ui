import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class ArrowLeftCircleIcon extends PureComponent {
  render() {
    return (
      <Icon name="arrow-left-circle" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 8 8 12 12 16" />
        <line x1="16" y1="12" x2="8" y2="12" />
      </Icon>
    )
  }
}
