import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class VolumeIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="volume" viewBox="0 0 24 24" {...this.props as any}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      </Icon>
    )
  }
}
