import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CameraOffIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="camera-off" viewBox="0 0 24 24" {...this.props as any}>
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56" />
      </Icon>
    )
  }
}
