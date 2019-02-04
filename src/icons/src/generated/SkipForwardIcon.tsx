import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class SkipForwardIcon extends PureComponent {
  render() {
    return (
      <Icon name="skip-forward" viewBox="0 0 24 24" {...this.props}>
        <polygon points="5 4 15 12 5 20 5 4" />
        <line x1="19" y1="5" x2="19" y2="19" />
      </Icon>
    )
  }
}
