import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class SmartphoneIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="smartphone" viewBox="0 0 24 24" {...this.props as any}>
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12" y2="18" />
      </Icon>
    )
  }
}
