import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class BibleIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="bible" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M4,19.5c0,-1.371 1.129,-2.5 2.5,-2.5l13.5,0" />
        <path d="M6.5,2l13.5,0l0,20l-13.5,0c-1.371,0 -2.5,-1.129 -2.5,-2.5l0,-15c0,-1.371 1.129,-2.5 2.5,-2.5Z" />
        <path d="M12,6l0,7" />
        <path d="M10,8l4,0" />
      </Icon>
    )
  }
}
