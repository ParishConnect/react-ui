import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class MinimizeIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="minimize" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
      </Icon>
    )
  }
}
