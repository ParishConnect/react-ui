import React, { PureComponent } from 'react'
import Icon, { IconProps } from '../Icon'
export default class XIcon extends PureComponent<IconProps> {
  render() {
    return (
      <Icon name="x" viewBox="0 0 24 24" {...this.props}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </Icon>
    )
  }
}
