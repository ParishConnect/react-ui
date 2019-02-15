import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class CloudRainIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="cloud-rain" viewBox="0 0 24 24" {...this.props}>
        <line x1="16" y1="13" x2="16" y2="21" />
        <line x1="8" y1="13" x2="8" y2="21" />
        <line x1="12" y1="15" x2="12" y2="23" />
        <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
      </Icon>
    )
  }
}
