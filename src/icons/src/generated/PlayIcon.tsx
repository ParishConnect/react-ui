import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class PlayIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="play" viewBox="0 0 24 24" {...this.props as any}>
        <polygon points="5 3 19 12 5 21 5 3" />
      </Icon>
    )
  }
}
