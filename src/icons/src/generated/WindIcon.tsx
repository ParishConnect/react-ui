import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class WindIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="wind" viewBox="0 0 24 24" {...this.props}>
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
      </Icon>
    )
  }
}
