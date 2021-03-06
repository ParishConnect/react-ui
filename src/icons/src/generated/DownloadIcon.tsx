import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class DownloadIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="download" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </Icon>
    )
  }
}
