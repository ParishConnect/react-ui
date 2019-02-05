import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class ClockIcon extends PureComponent {
  render() {
    return (
      <Icon name="clock" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </Icon>
    )
  }
}