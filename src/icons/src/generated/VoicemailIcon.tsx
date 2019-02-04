import React, { PureComponent } from 'react'
import Icon from '../Icon'
export default class VoicemailIcon extends PureComponent {
  render() {
    return (
      <Icon name="voicemail" viewBox="0 0 24 24" {...this.props}>
        <circle cx="5.5" cy="11.5" r="4.5" />
        <circle cx="18.5" cy="11.5" r="4.5" />
        <line x1="5.5" y1="16" x2="18.5" y2="16" />
      </Icon>
    )
  }
}
