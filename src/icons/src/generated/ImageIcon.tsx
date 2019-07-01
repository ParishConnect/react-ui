import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ImageIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="image" viewBox="0 0 24 24" {...this.props as any}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </Icon>
    )
  }
}
