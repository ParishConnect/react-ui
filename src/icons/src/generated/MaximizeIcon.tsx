import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class MaximizeIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="maximize" viewBox="0 0 24 24" {...this.props}>
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
      </Icon>
    )
  }
}
