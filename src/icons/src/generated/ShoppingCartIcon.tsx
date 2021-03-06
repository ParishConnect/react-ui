import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ShoppingCartIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="shopping-cart" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </Icon>
    )
  }
}
