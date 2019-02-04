import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class BatteryIcon extends PureComponent {
  render() {
    return (
      <Icon name="battery" viewBox="0 0 24 24" {...this.props}>
        <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
        <line x1="23" y1="13" x2="23" y2="11" />
      </Icon>
    )
  }
}
