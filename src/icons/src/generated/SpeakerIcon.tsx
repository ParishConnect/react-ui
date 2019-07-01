import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class SpeakerIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="speaker" viewBox="0 0 24 24" {...this.props as any}>
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <circle cx="12" cy="14" r="4" />
        <line x1="12" y1="6" x2="12" y2="6" />
      </Icon>
    )
  }
}
