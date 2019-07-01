import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ServerIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="server" viewBox="0 0 24 24" {...this.props as any}>
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6" y2="6" />
        <line x1="6" y1="18" x2="6" y2="18" />
      </Icon>
    )
  }
}
