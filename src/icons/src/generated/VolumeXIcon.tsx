import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class VolumeXIcon extends PureComponent {
  render() {
    return (
      <Icon name="volume-x" viewBox="0 0 24 24" {...this.props}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </Icon>
    )
  }
}
