import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class MehIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="meh" viewBox="0 0 24 24" {...this.props as any}>
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="15" x2="16" y2="15" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </Icon>
    )
  }
}
