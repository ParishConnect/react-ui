import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class SmileIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="smile" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </Icon>
    )
  }
}
