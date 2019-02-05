import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class CornerDownRightIcon extends PureComponent {
  render() {
    return (
      <Icon name="corner-down-right" viewBox="0 0 24 24" {...this.props}>
        <polyline points="15 10 20 15 15 20" />
        <path d="M4 4v7a4 4 0 0 0 4 4h12" />
      </Icon>
    )
  }
}