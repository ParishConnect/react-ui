import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class FlagIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="flag" viewBox="0 0 24 24" {...this.props}>
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </Icon>
    )
  }
}
