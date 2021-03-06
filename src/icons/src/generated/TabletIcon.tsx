import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class TabletIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="tablet" viewBox="0 0 24 24" {...this.props as any}>
        <rect
          x="4"
          y="2"
          width="16"
          height="20"
          rx="2"
          ry="2"
          transform="rotate(180 12 12)"
        />
        <line x1="12" y1="18" x2="12" y2="18" />
      </Icon>
    )
  }
}
