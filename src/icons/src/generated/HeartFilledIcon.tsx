import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class HeartFilledIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon isSolid name="heart-filled" viewBox="0 0 24 24" {...this.props as any}>
        <path
          d="M20.8,4.6c-2.1-2.1-5.6-2.1-7.8,0c0,0,0,0,0,0L12,5.7l-1.1-1.1c-2.1-2.1-5.6-2.1-7.8,0s-2.1,5.6,0,7.8l1.1,1.1
	l7.8,7.8l7.8-7.8l1.1-1.1C23,10.2,23,6.8,20.8,4.6C20.8,4.6,20.8,4.6,20.8,4.6z"
        />
      </Icon>
    )
  }
}
