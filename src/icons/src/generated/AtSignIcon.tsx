import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class AtSignIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="at-sign" viewBox="0 0 24 24" {...this.props}>
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
      </Icon>
    )
  }
}
