import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ListIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="list" viewBox="0 0 24 24" {...this.props as any}>
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3" y2="6" />
        <line x1="3" y1="12" x2="3" y2="12" />
        <line x1="3" y1="18" x2="3" y2="18" />
      </Icon>
    )
  }
}
