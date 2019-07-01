import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class FrownIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="frown" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </Icon>
    )
  }
}
