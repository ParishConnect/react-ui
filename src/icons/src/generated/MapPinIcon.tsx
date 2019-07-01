import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class MapPinIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="map-pin" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </Icon>
    )
  }
}
