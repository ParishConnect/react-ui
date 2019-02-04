import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class CornerLeftDownIcon extends PureComponent {
  render() {
    return (
      <Icon name="corner-left-down" viewBox="0 0 24 24" {...this.props}>
        <polyline points="14 15 9 20 4 15" />
        <path d="M20 4h-7a4 4 0 0 0-4 4v12" />
      </Icon>
    )
  }
}
