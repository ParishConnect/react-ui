import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ChurchPinIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="church-pin" viewBox="0 0 24 24" {...this.props}>
        <path d="M21,10c0,7 -9,13 -9,13c0,0 -9,-6 -9,-13c0,-4.937 4.063,-9 9,-9c4.937,0 9,4.063 9,9Z" />
        <path d="M14,7l-4,0" />
        <path d="M12,10l-5,3l2,-1.2l0,4.2l6,0l0,-4.2l2,1.2l-5,-3l0,-5" />
      </Icon>
    )
  }
}
