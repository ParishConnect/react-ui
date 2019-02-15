import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class PowerIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="power" viewBox="0 0 24 24" {...this.props}>
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </Icon>
    )
  }
}
