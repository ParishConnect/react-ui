import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class VideoIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="video" viewBox="0 0 24 24" {...this.props}>
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </Icon>
    )
  }
}
