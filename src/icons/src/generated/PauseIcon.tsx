import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class PauseIcon extends PureComponent {
  render() {
    return (
      <Icon name="pause" viewBox="0 0 24 24" {...this.props}>
        <rect x="6" y="4" width="4" height="16" />
        <rect x="14" y="4" width="4" height="16" />
      </Icon>
    )
  }
}