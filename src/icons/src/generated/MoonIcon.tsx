import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class MoonIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="moon" viewBox="0 0 24 24" {...this.props}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </Icon>
    )
  }
}
