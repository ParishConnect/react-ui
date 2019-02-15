import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class TruckIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="truck" viewBox="0 0 24 24" {...this.props}>
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </Icon>
    )
  }
}
