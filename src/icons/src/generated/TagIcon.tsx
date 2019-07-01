import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class TagIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="tag" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7" y2="7" />
      </Icon>
    )
  }
}
