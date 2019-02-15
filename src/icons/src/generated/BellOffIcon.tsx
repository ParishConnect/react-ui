import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class BellOffIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="bell-off" viewBox="0 0 24 24" {...this.props}>
        <path d="M8.56 2.9A7 7 0 0 1 19 9v4m-2 4H2a3 3 0 0 0 3-3V9a7 7 0 0 1 .78-3.22M13.73 21a2 2 0 0 1-3.46 0" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </Icon>
    )
  }
}
