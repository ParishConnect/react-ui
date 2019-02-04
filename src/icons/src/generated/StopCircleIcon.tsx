import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class StopCircleIcon extends PureComponent {
  render() {
    return (
      <Icon name="stop-circle" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="10" />
        <rect x="9" y="9" width="6" height="6" />
      </Icon>
    )
  }
}
