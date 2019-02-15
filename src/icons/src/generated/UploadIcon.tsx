import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class UploadIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="upload" viewBox="0 0 24 24" {...this.props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </Icon>
    )
  }
}
