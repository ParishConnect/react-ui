import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CloudOffIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="cloud-off" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </Icon>
    )
  }
}
