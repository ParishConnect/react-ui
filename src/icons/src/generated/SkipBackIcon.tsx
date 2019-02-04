import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class SkipBackIcon extends PureComponent {
  render() {
    return (
      <Icon name="skip-back" viewBox="0 0 24 24" {...this.props}>
        <polygon points="19 20 9 12 19 4 19 20" />
        <line x1="5" y1="19" x2="5" y2="5" />
      </Icon>
    )
  }
}
