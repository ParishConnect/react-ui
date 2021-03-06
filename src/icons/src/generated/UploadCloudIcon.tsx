import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class UploadCloudIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="upload-cloud" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="16 16 12 12 8 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
        <polyline points="16 16 12 12 8 16" />
      </Icon>
    )
  }
}
