import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class FeatherIcon extends PureComponent {
  render() {
    return (
      <Icon name="feather" viewBox="0 0 24 24" {...this.props}>
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </Icon>
    )
  }
}
