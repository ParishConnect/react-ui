import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class HeadingTwoIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="heading-two" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M12,11.75l-8,0l0,7.25l0,-14.5" />
        <path d="M13,4.5l0,14.5" />
        <path d="M17,10c0,0 4,-1.338 4,2c0,3.338 -4,7 -4,7l4.5,0" />
      </Icon>
    )
  }
}
