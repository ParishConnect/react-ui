import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class PauseCircleIcon extends PureComponent {
  render() {
    return (
      <Icon name="pause-circle" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="10" y1="15" x2="10" y2="9" />
        <line x1="14" y1="15" x2="14" y2="9" />
      </Icon>
    )
  }
}
