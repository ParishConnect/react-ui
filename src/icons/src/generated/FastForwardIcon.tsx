import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class FastForwardIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="fast-forward" viewBox="0 0 24 24" {...this.props as any}>
        <polygon points="13 19 22 12 13 5 13 19" />
        <polygon points="2 19 11 12 2 5 2 19" />
      </Icon>
    )
  }
}
