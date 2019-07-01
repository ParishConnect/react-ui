import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class TypeIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="type" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </Icon>
    )
  }
}
