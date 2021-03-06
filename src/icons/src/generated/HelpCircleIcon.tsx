import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class HelpCircleIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="help-circle" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12" y2="17" />
      </Icon>
    )
  }
}
