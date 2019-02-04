import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class AnchorIcon extends PureComponent {
  render() {
    return (
      <Icon name="anchor" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="5" r="3" />
        <line x1="12" y1="22" x2="12" y2="8" />
        <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
      </Icon>
    )
  }
}
