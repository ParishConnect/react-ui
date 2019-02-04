import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class UnderlineIcon extends PureComponent {
  render() {
    return (
      <Icon name="underline" viewBox="0 0 24 24" {...this.props}>
        <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
        <line x1="4" y1="21" x2="20" y2="21" />
      </Icon>
    )
  }
}
