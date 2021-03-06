import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ShoppingBagIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="shopping-bag" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </Icon>
    )
  }
}
