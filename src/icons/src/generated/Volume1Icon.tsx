import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class Volume1Icon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="volume-1" viewBox="0 0 24 24" {...this.props as any}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </Icon>
    )
  }
}
