import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class SlashIcon extends PureComponent {
  render() {
    return (
      <Icon name="slash" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </Icon>
    )
  }
}
