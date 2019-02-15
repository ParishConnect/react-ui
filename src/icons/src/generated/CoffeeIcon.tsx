import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CoffeeIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="coffee" viewBox="0 0 24 24" {...this.props}>
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </Icon>
    )
  }
}
