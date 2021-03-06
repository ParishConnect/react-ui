import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class UnlinkIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="unlink" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M15,7l3,0c2.743,0 5,2.257 5,5c0,2.743 -2.257,5 -5,5l-3,0m-6,0l-3,0c-2.743,0 -5,-2.257 -5,-5c0,-2.743 2.257,-5 5,-5l3,0" />
        <path d="M8.5,4l-1,-1.5" />
        <path d="M15.5,20l1,1.5" />
        <path d="M15.5,4l1,-1.5" />
        <path d="M8.5,20l-1,1.5" />
        <path d="M12.005,4l-0.005,-3" />
        <path d="M11.995,20l0.005,3" />
      </Icon>
    )
  }
}
