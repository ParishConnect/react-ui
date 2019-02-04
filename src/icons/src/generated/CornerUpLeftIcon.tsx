import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class CornerUpLeftIcon extends PureComponent {
  render() {
    return (
      <Icon name="corner-up-left" viewBox="0 0 24 24" {...this.props}>
        <polyline points="9 14 4 9 9 4" />
        <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
      </Icon>
    )
  }
}
