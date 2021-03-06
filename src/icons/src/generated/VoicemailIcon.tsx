import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class VoicemailIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="voicemail" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="5.5" cy="11.5" r="4.5" />
        <circle cx="18.5" cy="11.5" r="4.5" />
        <line x1="5.5" y1="16" x2="18.5" y2="16" />
      </Icon>
    )
  }
}
