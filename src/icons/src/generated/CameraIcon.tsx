import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CameraIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="camera" viewBox="0 0 24 24" {...this.props}>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </Icon>
    )
  }
}
