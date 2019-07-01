import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class RepeatIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="repeat" viewBox="0 0 24 24" {...this.props as any}>
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </Icon>
    )
  }
}
