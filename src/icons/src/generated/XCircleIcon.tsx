import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class XCircleIcon extends PureComponent {
  render() {
    return (
      <Icon name="x-circle" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </Icon>
    )
  }
}
