import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class ItalicIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="italic" viewBox="0 0 24 24" {...this.props as any}>
        <line x1="19" y1="4" x2="10" y2="4" />
        <line x1="14" y1="20" x2="5" y2="20" />
        <line x1="15" y1="4" x2="9" y2="20" />
      </Icon>
    )
  }
}
