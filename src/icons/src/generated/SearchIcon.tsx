import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class SearchIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="search" viewBox="0 0 24 24" {...this.props}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </Icon>
    )
  }
}
