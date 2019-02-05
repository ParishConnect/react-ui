import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class ToggleLeftIcon extends PureComponent {
  render() {
    return (
      <Icon name="toggle-left" viewBox="0 0 24 24" {...this.props}>
        <rect x="1" y="5" width="22" height="14" rx="7" ry="7" />
        <circle cx="8" cy="12" r="3" />
      </Icon>
    )
  }
}