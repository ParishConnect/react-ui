import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class PlayCircleIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="play-circle" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </Icon>
    )
  }
}
