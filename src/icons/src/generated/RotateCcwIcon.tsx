import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class RotateCcwIcon extends PureComponent {
  render() {
    return (
      <Icon name="rotate-ccw" viewBox="0 0 24 24" {...this.props}>
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </Icon>
    )
  }
}
