import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class Minimize2Icon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="minimize-2" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="4 14 10 14 10 20" />
        <polyline points="20 10 14 10 14 4" />
        <line x1="14" y1="10" x2="21" y2="3" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </Icon>
    )
  }
}
