import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class AirplayIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="airplay" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
        <polygon points="12 15 17 21 7 21 12 15" />
      </Icon>
    )
  }
}
