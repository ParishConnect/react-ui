import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ArchiveIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="archive" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="21 8 21 21 3 21 3 8" />
        <rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </Icon>
    )
  }
}
