import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class NormalTextIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="normal-text" viewBox="0 0 24 24" {...this.props}>
        <path d="M4,6.5c0,0 -0.016,-0.049 0,-0.5c0.036,-0.996 0.959,-1.982 2,-2c1.333,-0.023 6,0 6,0l6,0c1.041,0.018 1.964,1.004 2,2c0.016,0.451 0,0.5 0,0.5" />
        <path d="M11.959,4l0,16l0,-16Z" />
        <path d="M15.959,20l-7.959,0" />
      </Icon>
    )
  }
}
