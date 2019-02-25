import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class HeadingOneIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="heading-one" viewBox="0 0 24 24" {...this.props}>
        <path d="M12,11.75l-8,0l0,7.25l0,-14.5" />
        <path d="M13,4.5l0,14.5" />
        <path d="M17.5,10.8l2.5,-1.75l0,10" />
      </Icon>
    )
  }
}
