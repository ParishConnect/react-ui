import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class EyeIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="eye" viewBox="0 0 24 24" {...this.props as any}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </Icon>
    )
  }
}
