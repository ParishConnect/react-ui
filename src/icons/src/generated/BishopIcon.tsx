import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class BishopIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="bishop" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M5.5,22.5c0,0 1.134,-3 6.5,-3c5.366,0 6.5,3 6.5,3" />
        <path d="M8,14c0,0 1.03,3 4,3c2.97,0 4,-3 4,-3" />
        <path d="M12,11.5l5,0c0,0 1,-0.431 1,-2.5c0,-3.178 -6,-7 -6,-7c0,0 -6,3.822 -6,7c0,2.069 1,2.5 1,2.5l5,0" />
        <path d="M12,6l0,3.5" />
        <path d="M13,7l-2,0" />
      </Icon>
    )
  }
}
